import express from "express";
import "dotenv/config";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Tag, Content, ShareLink, mongoose } from "./db";
import authMiddleware from "./authMiddleware";
import * as cheerio from "cheerio";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
    // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Incoming Content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  next();
});

const limit = 9;

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  const requestBodySchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must not exceed 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(100, "Password must not exceed 100 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  });
  const result = requestBodySchema.safeParse(req.body);
  if (!result.success) {
    res.status(411).json({ message: result.error });
    return;
  }
  try {
    const alreadyExists = await User.findOne({
      username,
    });
    if (alreadyExists) {
      res.status(403).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS) || 10
    );
    await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Signed up successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      res.status(403).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { userId: userExists._id },
      process.env.JWT_SECRET || "DEFAULT_SECRET"
    );
    res.status(200).json({ jwt: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});
app.get("/api/v1/content", authMiddleware, async (req, res) => {
  const type = req.query.type;
  const page = Number(req.query.page) || 1;

  const filter: { userId?: string; type?: string | {}; tags?: {} } = {
    userId: req.userId,
  };
  if (type === "youtube" || type === "tweet") {
    filter.type = type;
  } else if (type === "other") {
    filter.type = { $nin: ["tweet", "youtube"] };
  } else if (type === "tag") {
    const tagId = await Tag.findOne({ name: req.query.value });
    console.log(tagId);
    filter.tags = tagId?._id || 123;
  } else if (type !== "all") {
    res.status(404).json({ message: "No content for this type" });
    return;
  }

  try {
    const totalDocuments = await Content.countDocuments(filter);
    const result = await Content.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("tags");
    res
      .status(200)
      .json({ totalPages: Math.ceil(totalDocuments / limit), data: result });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.post("/api/v1/content", authMiddleware, async (req, res) => {
  console.log(req.body);

  const { type, link, title, tags } = req.body;
  // res.set("Access-Control-Allow-Origin", "*");

  try {
    const tagIds = await Promise.all(
      tags.map(async (tag: string) => {
        const tagExists = await Tag.findOne({ name: tag });
        // console.log(typeof tagExists);
        if (tagExists) {
          return tagExists._id;
        }
        const createdTag = await Tag.create({ name: tag });
        return createdTag._id;
      })
    );

    const result = await Content.create({
      userId: req.userId,
      type: type,
      link: link,
      title: title,
      tags: tagIds,
    });
    res
      .status(200)
      .json({ message: "Content added successfully", content: result });
  } catch (err) {
    // console.log("Error posting contnet", err);
    res.status(500).json({ message: err });
  }
});
app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const { linkId } = req.body;
  console.log("linkId  : ", linkId, " type : ", typeof linkId);
  try {
    const result = await Content.findByIdAndDelete(linkId);
    if (result) {
      res.status(200).json({ message: "Content deleted successfully" });
      return;
    }
    res.status(404).json({ message: "Content not found" });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err });
  }
});
app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const { toShare } = req.body;

  try {
    const LinkExists = await ShareLink.findOne({ userId: req.userId });
    if (LinkExists) {
      const changedShareOption = await ShareLink.findOneAndUpdate(
        { userId: req.userId },
        { enableShare: toShare }
      );
      const toSend: {
        message: string;
        link?: string | null;
        enableShare?: boolean;
      } = {
        message: "Share options updated successfully",
        enableShare: changedShareOption?.enableShare,
      };
      // if (changedShareOption?.enableShare) {
      toSend.link = changedShareOption?.hash;

      res.status(200).json(toSend);
      return;
    }
    const result = await ShareLink.create({
      userId: req.userId,
      hash: await bcrypt.hash(req.userId!, 1),
      enableShare: true,
    });
    res
      .status(200)
      .json({ message: "Link Created successfully", link: result.hash });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/api/v1/brain/share", authMiddleware, async (req, res) => {
  try {
    const response = await ShareLink.findOne({
      userId: req.userId,
    });
    if (response === null) {
      res.status(404).json({ message: "User link not found" });
      return;
    }
    res.status(200).json({ shareLink: response?.enableShare });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const { shareLink } = req.params;
  const page = Number(req.query.page) || 1;
  try {
    const isLinkActive = await ShareLink.findOne({ hash: shareLink }).populate(
      "userId",
      "username"
    );

    if (isLinkActive && isLinkActive.enableShare) {
      const totalContents = await Content.countDocuments({
        userId: isLinkActive.userId,
      });
      const totalPages = Math.ceil(totalContents / limit);
      const result = await Content.find({
        userId: isLinkActive.userId,
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("tags");
      res.status(201).json({
        userDetails: isLinkActive,
        contentsByUser: { totalPages, data: result },
      });
      return;
    }
    res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get("/api/v1/tags", authMiddleware, async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.put("/api/v1/content/:contentId", authMiddleware, async (req, res) => {
  const { tags, ...toUpdate } = req.body;
  const { contentId } = req.params;
  console.log("Request body:", JSON.stringify(req.body));
  console.log("User ID from token:", req.userId);
  console.log("Content ID from params:", req.params.contentId);
  try {
    const tagIds = await Promise.all(
      tags.map(async (tag: string) => {
        const tagExists = await Tag.findOne({ name: tag });
        if (tagExists) {
          return tagExists._id;
        }
        const createdTag = await Tag.create({ name: tag });
        return createdTag._id;
      })
    );

    const updated = await Content.findOneAndUpdate(
      { userId: req.userId, _id: contentId },
      { tags: tagIds, ...toUpdate }
    );

    if (!updated) {
      res
        .status(404)
        .json({ message: "Content not found or User not logged in" });
      return;
    }
    res.status(200).json({ message: "Content details updated" });
  } catch (err) {
    console.error("error updating content info : ", err);
    res.status(500).json({ message: err });
  }
});

app.get("/api/v1/mostUsedTags", authMiddleware, async (req, res) => {
  try {
    const tagCounts = await Content.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          totalQuantity: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalQuantity: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const populated = await Promise.all(
      tagCounts.map(async ({ _id, totalQuantity }) => {
        const tag = await Tag.findById(_id);
        return {
          tagId: _id,
          tagName: tag?.name || "Unknown",
          totalQuantity,
        };
      })
    );

    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.get("/api/v1/preview", async (req, res) => {
  const url = req.query.url as string;
  let response;
  try {
    response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
  } catch (err) {
    console.log("error making get request to url", err);
    res.status(500).json({ message: "error making get request to url" });
    return;
  }
  const html = response.data;
  const $ = cheerio.load(html);
  const title =
    $("title").text() ||
    $('meta[name="twitter:title"]').attr("content") ||
    null;
  const description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    null;
  const img =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content") ||
    null;

  res.status(200).json({ title, description, img });
});

app.listen(process.env.PORT, () => {
  console.log("Listening at port : ", process.env.PORT);
});

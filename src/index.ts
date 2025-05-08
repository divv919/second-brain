import express from "express";
import "dotenv/config";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Tag, Content, ShareLink, mongoose } from "./db";
import authMiddleware from "./authMiddleware";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  try {
    const result = await Content.find({
      userId: req.userId,
    }).populate("tags");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const { type, link, title, tags } = req.body;
  try {
    const tagIds = await Promise.all(
      tags.map(async (tag: string) => {
        const tagExists = await Tag.findOne({ name: tag });
        console.log(typeof tagExists);
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
    res.status(500).json({ message: err });
  }
});
app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const linkId = req.body;
  try {
    const result = await Content.findByIdAndDelete(linkId);
    if (result) {
      res.status(200).json({ message: "Content deleted successfully" });
    }
    res.status(404).json({ message: "Content not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const { toShare } = req.body;

  try {
    const LinkExists = await ShareLink.findOne({ userId: req.userId });
    if (LinkExists) {
      const changedShareOption = await ShareLink.updateOne(
        { userId: req.userId },
        { enableShare: toShare }
      );
      res.status(200).json({ message: "Share options updated successfully" });
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
app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const { shareLink } = req.params;
  try {
    const isLinkActive = await ShareLink.findOne({ hash: shareLink }).populate(
      "userId",
      "username"
    );

    if (isLinkActive && isLinkActive.enableShare) {
      const result = await Content.find({
        userId: isLinkActive.userId,
      }).populate("tags");
      res
        .status(200)
        .json({ userDetails: isLinkActive, contentsByUser: result });
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
app.listen(process.env.PORT);

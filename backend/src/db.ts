import mongoose from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.MONGODB_CONNECTION_LINK || "DEFAULT_STRING");
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const ContentSchema = new mongoose.Schema({
  type: String,
  userId: { type: mongoose.Schema.ObjectId, ref: "users", required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: mongoose.Schema.ObjectId, ref: "tags" }],
});

const TagSchema = new mongoose.Schema({
  name: String,
});

const ShareLinkSchema = new mongoose.Schema({
  hash: String,
  enableShare: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.ObjectId, ref: "users" },
});

const User = mongoose.model("users", UserSchema);
const Tag = mongoose.model("tags", TagSchema);
const Content = mongoose.model("contents", ContentSchema);
const ShareLink = mongoose.model("sharelinks", ShareLinkSchema);

export { User, Content, Tag, ShareLink, mongoose };

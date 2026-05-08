import express from "express";
import { connectDB, contentModel, userModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await userModel.create({
    username,
    password,
  });

  res.json({
    message: "User signed up",
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userModel.findOne({ username, password });
  if (existingUser) {
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
    return res.status(200).json({
      token,
    });
  } else {
    return res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link, type } = req.body;

  await contentModel.create({
    title,
    link,
    type,
    //@ts-ignore
    userId: req.userId,
    tags: [],
  });

  return res.json({
    message: "Content created",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await contentModel
    .find({ userId })
    .populate("userId", "username");
  res.json({ content });
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const { contentId } = req.body;
  try {
    await contentModel.deleteMany({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });
  } catch (error) {
    console.log(error);
  }
  res.json({
    message: "Content deleted",
  });
});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("DB error", err);
    process.exit(1);
  });

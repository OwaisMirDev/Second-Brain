import express, {} from "express";
import { connectDB, contentModel, linkModel, userModel } from "./db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
const app = express();
const port = 3000;
app.use(express.json());
function getHash() {
    const options = "qwertyuiop123asdfghjklzxcv45678vbnm0972";
    let hash = "";
    let length = options.length;
    for (let i = 0; i < length; i++) {
        hash += options[Math.floor(Math.random() * length)];
    }
    return hash;
}
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
    }
    else {
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
        userId: req.userId,
        tags: [],
    });
    return res.json({
        message: "Content created",
    });
});
app.get("/api/v1/content", userMiddleware, async (req, res) => {
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
            userId: req.userId,
        });
    }
    catch (error) {
        console.log(error);
    }
    res.json({
        message: "Content deleted",
    });
});
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const hash = getHash();
        const exist = await linkModel.findOne({
            userId: req.userId,
        });
        if (exist) {
            return res.status(409).json({
                message: "Link already created",
            });
        }
        await linkModel.create({
            hash,
            userId: req.userId,
        });
        return res.json({
            message: `http://localhost:3000/api/v1/brain/${hash}`,
        });
    }
    await linkModel.deleteOne({ userId: req.userId });
    return res.json({
        message: "Link access removed",
    });
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await linkModel.findOne({
        hash,
    });
    if (!link) {
        return res.status(400).json({
            message: "Link does not exist",
        });
    }
    const user = await userModel.findOne({ _id: link.userId });
    if (!user) {
        return res.status(400).json({
            message: "User does not exist",
        });
    }
    const content = await contentModel.find({
        userId: link.userId,
    });
    res.json({
        username: user.username,
        content,
    });
});
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

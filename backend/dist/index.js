import express from "express";
import { connectDB, userModel } from "./db.js";
import jwt from "jsonwebtoken";
const secret = "Brain";
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
        const token = jwt.sign({ id: existingUser._id }, secret);
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
app.post("/api/v1/content", (req, res) => { });
app.get("/api/v1/content", (req, res) => { });
app.delete("/api/v1/content", (req, res) => { });
app.post("/api/v1/brain/share", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
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

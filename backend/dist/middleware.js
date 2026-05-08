import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not logged in!",
        });
    }
};

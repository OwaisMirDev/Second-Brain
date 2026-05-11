import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { Types } from "mongoose";
import type { AuthenticatedRequest } from "./auth.types.js";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers["authorization"];
  const decoded = jwt.verify(token as string, JWT_SECRET) as JwtPayload;
  if (decoded) {
    req.userId = new Types.ObjectId(decoded.id);
    next();
  } else {
    res.status(403).json({
      message: "You are not logged in!",
    });
  }
};

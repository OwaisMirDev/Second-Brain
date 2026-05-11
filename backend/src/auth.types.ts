import { Types } from "mongoose";
import type { Request } from "express";
export interface AuthenticatedRequest extends Request {
  userId: Types.ObjectId;
}

import mongoose, { Schema, model } from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(`mongodb://localhost:27017/brain`);
};

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const userModel = model("user", userSchema);

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});
export const tagModel = model("tag", tagSchema);

const linkSchema = new Schema({
  hash: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
});
export const linkModel = model("link", linkSchema);

const contentTypes = ["image", "video", "article", "audio", "document"];
const contentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "tag",
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
});
export const contentModel = model("content", contentSchema);

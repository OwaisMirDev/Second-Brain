import mongoose, { Schema, model, mongo } from "mongoose";

const connectDB = async () => {
  await mongoose.connect(`mongodb://localhost:27017/brain`);
};

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const userModel = model("user", userSchema);

const tagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const tagModel = model("tag", tagSchema);

const contentTypes = ["image", "video", "article", "audio"];
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
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

const contentModel = model("content", contentSchema);

export { userModel, tagModel, contentModel, connectDB };

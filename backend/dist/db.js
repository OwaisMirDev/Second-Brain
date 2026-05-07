import mongoose, { Schema, model } from "mongoose";
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
export { userModel, connectDB };

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  role: { type: String, default: "user", enum: ["user", "admin"] },
  password: { type: String, required: true, minlength: 6 },
  avatar: { id: String, secure_url: String },
  blogs: [{ type: mongoose.Types.ObjectId, required: true, ref: "Blog" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

export default mongoose.model("User", userSchema);

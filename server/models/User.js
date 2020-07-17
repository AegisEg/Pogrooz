const mongoose = require("../database");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    first: String,
    last: String,
    middle: String,
  },
  email: { type: String, select: true },
  phone: { type: String, select: true },
  avatar: { type: Object, select: true },
  type: { type: String, enum: ["cargo", "carrier", "admin"], select: true },
  country: { type: String, default: "", select: true },
  password: { type: String, select: false },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: String, select: false },
  verifiedToken: { type: String, select: false },
  verifiedTokenExpires: { type: String, select: false },
  isVerified: { type: Boolean, select: false },
  online: { type: Boolean, default: true },
  onlineAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now, select: false },
  buff: Buffer,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

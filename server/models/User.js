const mongoose = require("../database");
const Schema = mongoose.Schema;
const MongooseTrigger = require('mongoose-trigger');

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
  country: { type: Number, select: true },
  address: { type: String, default: "", select: true },
  contract: {
    id: { type: Number, select: true },
    data: { type: Object, select: true },
  },
  password: { type: String, select: false },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: String, select: false },
  verifiedToken: { type: String, select: false },
  verifiedTokenExpires: { type: String, select: false },
  isVerified: { type: Boolean, select: false },
  online: { type: Boolean, default: true },
  onlineAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now, select: false },
  isPassportVerified: { type: Boolean, default: false, select: true },
  buff: Buffer,
});

UserSchema.pre('findOneAndUpdate', async function(next) {
  let docToUpdate = await this.model.findOne(this.getQuery());
  let docDoUpdate = this.getUpdate().$set

  if(!docToUpdate.isPassportVerified && docDoUpdate.isPassportVerified) {
    console.log('send notification with socket')
  }
  
  next()
});

const User = mongoose.model("User", UserSchema);



module.exports = User;

const mongoose = require("../database");
const Schema = mongoose.Schema;
const MongooseTrigger = require("mongoose-trigger");

const UserSchema = new Schema({
  name: {
    first: String,
    last: String,
    middle: String,
  },
  email: { type: String, select: true },
  phone: { type: String, select: true },
  avatar: { type: Object, select: true },
  type: { type: String, enum: ["cargo", "carrier"], select: true },
  country: { type: Number, select: true },
  address: { type: String, default: "", select: true },
  contract: {
    id: { type: Number, select: true },
    data: { type: Object, select: true },
  },
  password: { type: String, select: false },
  online: { type: Boolean, default: true },
  passportPhoto: { type: Object, select: true },
  isVerified: { type: Boolean, select: false },
  isPassportVerified: { type: Boolean, default: false, select: true },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: { type: String, select: false },
  verifiedToken: { type: String, select: false },
  verifiedTokenExpires: { type: String, select: false },
  onlineAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now, select: false },
  buff: Buffer,
});

UserSchema.pre("findOneAndUpdate", async function(next) {
  let docToUpdate = await this.model.findOne(this.getQuery());
  let docDoUpdate = this.getUpdate().$set;
  const Notification = require("./Notification");
  const { sendNotification } = require("../controllers/SocketController");
  if (!docToUpdate.isPassportVerified && docDoUpdate.isPassportVerified) {
    let notification = new Notification();
    notification.user = docToUpdate._id;
    notification.info = {};
    notification.code = "ARTICLE_PASSPORT_MODERATION";
    notification.type = "system";
    await notification.save();
    sendNotification({
      userId: docToUpdate._id,
      notification,
    });
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

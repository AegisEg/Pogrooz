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
  rating: { type: Number, select: true },
  password: { type: String, select: false },
  online: { type: Boolean, default: true },
  passportPhoto: {
    path: String,
    name: String,
    size: Number,
  },
  isBan: { type: Boolean, default: false },
  isTariff: { type: Boolean, default: true },
  banJobId: { type: mongoose.Schema.Types.ObjectId },
  notificationSettings: {
    offer_new_request: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    offer_you_executor: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    offer_status: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    offer_new_review: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    offer_new_message: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_tracking: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_new_request: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_you_executor: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_status: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_new_review: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_new_message: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_tracking: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    user_new_message: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    order_moderation: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    offer_moderation: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    system: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    tarif_ends: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    tarif_payed: {
      mail: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
  },
  isEnableAutoPay: { type: Boolean, default: false },
  bindingIdCard: { type: String, default: null, select: false },
  isVerified: { type: Boolean, select: false },
  isPassportVerified: { type: Boolean, default: false, select: true },
  isPassportUploaded: { type: Boolean, default: false, select: true },
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
  const {
    sendNotification,
    modarationSuccess,
  } = require("../controllers/SocketController");
  const mail = require("../config/mail");
  const { sendMail } = require("../controllers/MailController");
  if (!docToUpdate.isPassportVerified && docDoUpdate.isPassportVerified) {
    let notification = new Notification();
    notification.user = docToUpdate._id;
    notification.info = {};
    notification.code = "PASSPORT_MODERATION";
    notification.type = "system";
    await notification.save();
    let mailTemplate = mail.find((item) => item.code === notification.code);
    if (mailTemplate) {
      sendMail(docToUpdate.email, notification, mailTemplate);
    }
    sendNotification({
      userId: docToUpdate._id,
      notification,
      isPushSong: true,
    });
    modarationSuccess({ userId: docToUpdate._id });
  }

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

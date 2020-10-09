const Agenda = require("agenda");
const mongoose = require("../database");
const Payment = require("../models/Payment");
const User = require("../models/User");
const { donTariff, cancelBan } = require("../controllers/SocketController");
const { cancelBanUser } = require("../controllers/UserController");
const { articleUnpulish } = require("../controllers/ArticleController");
const { autoPayment } = require("../controllers/TariffController");
const agenda = new Agenda().mongo(mongoose.connection, "jobs");
agenda.define("setTarrifCancel", async (job) => {
  let userId = job.attrs.data.userId;
  let tarrif = await Payment.findOne({
    userId: userId,
    status: "success",
    expiriesAt: { $gte: Date.now() },
  }).sort({ expiriesAt: -1 });
  if (!tarrif) {
    let autopay = false;
    let user = await User.findById(userId).select("bindingIdCard");
    if (user.isEnableAutoPay && user.bindingIdCard) {
      autopay = autoPayment(user);
    }
    //Если автоплатеж не включен
    if (!autopay) {
      donTariff({ userId: userId });
      user.isTariff = false;
      await user.save();
    }
  }
  await agenda.cancel({ _id: job.attrs._id });
});
agenda.define("articleUnpublish", async (job) => {
  let articleId = job.attrs.data.articleId;
  articleUnpulish(articleId);
  await agenda.cancel({ _id: job.attrs._id });
});
agenda.define("setBanCancel", async (job) => {
  let userId = job.attrs.data.userId;
  let createdAt = job.attrs.data.banCreatedAt;
  cancelBanUser(userId, createdAt);
  await agenda.cancel({ _id: job.attrs._id });
});
module.exports = agenda;

/**
 * UserController.js
 * Author: Vasilev Egor
 */
"use strict";

const User = require("../models/User");
const Article = require("../models/Article");
const Ban = require("../models/Ban");
const Notification = require("../models/Notification");
const Payment = require("../models/Payment");
const Review = require("../models/Review");
const {
  setBan,
  cancelBan,
  sendNotification,
  modarationSuccess,
  modarationFail,
} = require("./SocketController");
const bcrypt = require("bcryptjs");
// const agenda = require("../agenta/agenta");
const NUM_ROUNDS = 12;
const { randomString } = require("./FileController");
const { InfoForLogin } = require("./AuthController");
const mail = require("../config/mail");
let { sendMail } = require("../controllers/MailController");

module.exports = {
  // Get user data
  user: async (req, res, next) => {
    const { userId } = res.locals;
    // try {
    // Get this account as JSON
    let user = await checkTarifAndBan(userId);
    if (user) {
      let {
        myCountsArticles,
        takeCountsArticles,
        onlyNoRead,
        notificationCounts,
        dialogsCount,
        currentPaymentTariff,
        lastPaymentExpiriesAt,
        needSendLocation,
      } = await InfoForLogin(user);
      user = {
        ...user._doc,
        tariff: currentPaymentTariff,
        expiriesTariffAt: lastPaymentExpiriesAt,
        needSendLocation,
      };
      // await User.updateMany({}, { $set: { isPassportUploaded: false } });
      return res.json({
        user,
        myCountsArticles,
        takeCountsArticles,
        onlyNoRead,
        notificationCounts,
        dialogsCount,
      });
    }
    const err = new Error(`User ${userId} not found.`);
    err.notFound = true;
    return next(err);
    // } catch (e) {
    //   return next(new Error(e));
    // }
  },
  get: async (req, res, next) => {
    const { userId } = req.body;

    try {
      if (!!userId && userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Get this account as JSON
        let user = await User.findById({ _id: userId });
        let countData = {},
          datacount;
        if (user) {
          let type = user.type === "cargo" ? "order" : "offer";

          datacount = await Article.aggregate([
            {
              $match: {
                status: { $in: [4, 5, 6] },
                executors: user._id,
              },
            },
            {
              $count: "count",
            },
          ]);
          countData.isGetted = (!!datacount.length && datacount[0].count) || 0;
          datacount = await Article.aggregate([
            {
              $match: {
                type: type,
                status: 2,
                author: user._id,
              },
            },
            {
              $count: "count",
            },
          ]);
          countData.public = (!!datacount.length && datacount[0].count) || 0;
          datacount = await Article.aggregate([
            {
              $match: {
                type: type,
                status: 5,
                author: user._id,
              },
            },
            {
              $count: "count",
            },
          ]);
          countData.success = (!!datacount.length && datacount[0].count) || 0;
          datacount = await Article.aggregate([
            {
              $match: {
                type: type,
                status: 6,
                author: user._id,
              },
            },
            {
              $count: "count",
            },
          ]);
          countData.canceled = (!!datacount.length && datacount[0].count) || 0;
          countData.reviews = await Review.find({ user: userId }).count();
          return res.json({
            user,
            countData,
          });
        }
      }
      return res.json({
        error: true,
        errors: [{ param: "user", msg: `User ${userId} not found.` }],
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getOnline: async (req, res, next) => {
    const { userId } = req.body;

    try {
      let user = await User.findById(userId).select(["online", "onlineAt"]);

      return res.json(user);
    } catch (e) {
      return next(new Error(e));
    }
  },
  profileEdit: async (req, res, next) => {
    const { user } = res.locals;
    let { userChange } = req.body;
    userChange = JSON.parse(userChange);
    try {
      if (userChange.email) {
        let emailExist = await User.findOne({
          email: userChange.email,
          _id: { $ne: user._id },
        });
        if (emailExist)
          return res.status(401).json({
            error: true,
            errors: [{ param: "email", msg: "Email уже занят" }],
          });
      } else
        return res.status(401).json({
          error: true,
          errors: [{ param: "email", msg: "Email не может быть пустым" }],
        });
      if (user.email !== userChange.email) user.email = userChange.email;
      if (userChange.name)
        //Проверка почты
        user.name = userChange.name;
      if (req.files && req.files["avatar"]) {
        if (req.files["avatar"].size / 1000 <= 10000) {
          let fileName = randomString(24);
          let filePath =
            "./uploads/" +
            user._id +
            "/" +
            fileName +
            "." +
            req.files["avatar"].name.split(".").pop();
          req.files["avatar"].mv(filePath, function(err) {
            if (err) return res.status(500).send(err);
          });
          user.avatar = {
            path:
              process.env.API_URL +
              "/media/" +
              user._id +
              "/" +
              fileName +
              "." +
              req.files["avatar"].name.split(".").pop(),
            name: req.files["avatar"].name,
            size: req.files["avatar"].size,
          };
        } else {
          let err = {};
          err.param = `file`;
          err.msg = `max_size`;
          return res.status(401).json({ error: true, errors: [err] });
        }
      }
      if (req.files && req.files["passportPhoto"]) {
        if (req.files["passportPhoto"].size / 1000 <= 10000) {
          let fileName = randomString(24);
          let filePath =
            "./uploads/" +
            user._id +
            "/" +
            fileName +
            "." +
            req.files["passportPhoto"].name.split(".").pop();
          req.files["passportPhoto"].mv(filePath, function(err) {
            if (err) return res.status(500).send(err);
          });
          user.passportPhoto = {
            path:
              process.env.API_URL +
              "/media/" +
              user._id +
              "/" +
              fileName +
              "." +
              req.files["passportPhoto"].name.split(".").pop(),
            name: req.files["passportPhoto"].name,
            size: req.files["passportPhoto"].size,
          };
          user.isPassportUploaded = true;
        } else {
          let err = {};
          err.param = `file`;
          err.msg = `max_size`;
          return res.status(401).json({ error: true, errors: [err] });
        }
      }
      if (userChange.contract) user.contract = userChange.contract;
      if (userChange.address) user.address = userChange.address;
      if (userChange.country) user.country = userChange.country;
      if (userChange.phone) user.phone = userChange.phone;

      user.save();
      return res.json({ user });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getSettings: async (req, res, next) => {
    const { user } = res.locals;
    try {
      return res.json({ settings: user.notificationSettings });
    } catch (e) {
      return next(new Error(e));
    }
  },
  notificationSettings: async (req, res, next) => {
    const { user } = res.locals;
    let { settings } = req.body;
    try {
      user.notificationSettings = settings;
      user.save();
      return res.json({ error: false });
    } catch (e) {
      return next(new Error(e));
    }
  },
  passChange: async (req, res, next) => {
    const { user } = res.locals;
    const { passObj } = req.body;
    if (passObj.newPassword === passObj.confirmPassword) {
      try {
        let userWithPassword = await User.findOne({
          _id: user._id,
        }).select("+password");
        const verifiedPassword = await bcrypt.compare(
          passObj.lastPassword,
          userWithPassword.password
        );
        if (verifiedPassword) {
          userWithPassword.password = await bcrypt.hash(
            passObj.newPassword,
            NUM_ROUNDS
          );
          userWithPassword.save();
          return res.json({
            error: false,
          });
        } else
          return res.status(401).json({
            error: true,
            errors: [{ param: "password", msg: "Passwords don't match" }],
          });
      } catch (e) {
        return next(new Error(e));
      }
    } else
      return res.status(401).json({
        error: true,
        errors: [
          { param: "confirmPassword", msg: "PasswordRetry don't match" },
        ],
      });
  },
  modarationFail: async (req, res, next) => {
    let { userId, commentFail } = req.body;
    let user = await User.findById(userId);
    user.isPassportUploaded = false;
    user.passportPhoto = {};
    user.save();
    if (user && commentFail) {
      createNotify(user, { commentFail }, "PASSPORT_MODERATION_FAIL", "system");
      modarationFail({ userId });
      return res.json({ error: false });
    }
    return res.json({ error: true });
  },
  userBan: async (req, res, next) => {
    const { userId, duration, commentBan } = req.body;
    try {
      let user = await User.findById(userId);
      if (
        (!user.isBan && (user.isTariff && user.type === "carrier")) ||
        user.type === "cargo"
      ) {
        let ban = new Ban();
        ban.user = userId;
        ban.expiriesAt = Date.now() + 1000 * 60 * 60 * 24 * duration;
        await ban.save();
        setBan({ userId });
        if (commentBan)
          createNotify(user, { commentBan }, "BAN_COMMENT_NOTIFY", "system");
        const agenda = require("../agenta/agenta");
        let job = await agenda.schedule(ban.expiriesAt, "setBanCancel", {
          userId: user._id,
          banCreatedAt: ban.createdAt,
        });
        await User.findOneAndUpdate(
          { _id: userId },
          { $set: { isBan: true, banJobId: job.attrs._id } }
        );
        return res.json({ error: false });
      }
      return res.json({ error: true });
    } catch (error) {
      return next(new Error(e));
    }
  },
  toogleAutoPay: async (req, res, next) => {
    let { user } = res.locals;
    try {
      user.isEnableAutoPay = !user.isEnableAutoPay;
      await user.save();
      return res.json({ isEnableAutoPay: user.isEnableAutoPay });
    } catch (e) {
      return next(new Error(e));
    }
  },
  sendNotify: async (req, res, next) => {
    const { commentNotify, userType, userId } = req.body;
    try {
      let users,
        typeSender,
        userName = false;
      if (userId) {
        let user = await User.findById(userId);
        if (user) users = [user];
        typeSender = "user";
        userName = user.name.last + " " + user.name.first;
      } else if (userType) {
        let filter = {};
        if (userType === "carrier") {
          filter.type = "carrier";
          typeSender = "carrier";
        }
        if (userType === "cargo") {
          filter.type = "cargo";
          typeSender = "cargo";
        }
        if (userType === "all") typeSender = "all";
        users = await User.find(filter);
      }
      if (!users || !users.length) return res.status(422).json({ error: true });
      users.map((item) => {
        createNotify(
          item,
          { commentNotify, typeSender, userName },
          "SYSTEM_NOTIFY",
          "system"
        );
      });
      return res.json({ error: false });
    } catch (error) {
      console.log(error);
    }
  },
  cancelBanRequest: async (userId) => {
    try {
      let ban = await Ban.findOne({
        user: userId,
        expiriesAt: { $gt: new Date() },
      }).sort({ expiriesAt: -1 });
      let user = await User.findById(userId);
      if (ban && user) {
        cancelBanUser(userId, ban.createdAt);
        const agenda = require("../agenta/agenta");
        if (user.banJobId) await agenda.cancel({ _id: user.banJobId });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
  cancelBanUser: cancelBanUser,
};
async function checkTarifAndBan(userId) {
  let user = await User.findById(userId);
  if (user) {
    let tariff = await Payment.findOne({
      userId: user._id,
      status: "success",
      expiriesAt: { $gte: Date.now() },
    }).sort({ expiriesAt: -1 });
    let ban = await Ban.findOne({
      user: user._id,
      expiriesAt: { $gte: Date.now() },
    }).sort({ expiriesAt: -1 });
    let isSave = false;
    if (tariff && !user.isTariff) {
      user.isTariff = true;
      isSave = true;
    }
    if (!tariff && user.isTariff) {
      user.isTariff = false;
      isSave = true;
    }
    if (ban && !user.isBan) {
      user.isBan = true;
      isSave = true;
    }
    if (!ban && user.isBan) {
      user.isBan = false;
      isSave = true;
    }
    if (isSave) await user.save();
  }
  return user;
}
async function cancelBanUser(userId, createdAt) {
  try {
    let user = await User.findOne({ _id: userId });
    user.isBan = false;
    await user.save();
    if (user.type === "carrier") {
      let lastPayment = await Payment.findOne({
        userId,
        status: "success",
        expiriesAt: { $gte: createdAt },
      }).sort({ expiriesAt: 1 });
      let firstPayment = await Payment.findOne({
        userId,
        status: "success",
        expiriesAt: { $gte: Date.now() },
      })
        .sort({ expiriesAt: -1 })
        .populate("tariff");
      let currentPayment = await Payment.findOne({
        userId,
        status: "success",
        expiriesAt: { $gte: Date.now() },
      })
        .sort({ expiriesAt: 1 })
        .populate("tariff");
      if (lastPayment) {
        let bannedPayment = new Payment();
        bannedPayment.userId = userId;
        bannedPayment.ban = { duration: 1000 * 60 * 60 * 24 };
        bannedPayment.status = "success";
        let lastExpiriesAt = Date.now();
        if (firstPayment) {
          lastExpiriesAt = new Date(firstPayment.expiriesAt).getTime();
          bannedPayment.expiriesAt =
            lastExpiriesAt + (Date.now() - new Date(createdAt).getTime());
        } else
          bannedPayment.expiriesAt =
            lastExpiriesAt +
            (new Date(lastPayment.expiriesAt).getTime() -
              new Date(createdAt).getTime());
        bannedPayment.startedAt = lastExpiriesAt;
        bannedPayment.updatedAt = Date.now();
        bannedPayment.save();
        if (currentPayment)
          cancelBan({
            userId,
            tariff: currentPayment.tariff,
            expiriesAt: currentPayment.expiriesAt,
          });
        else if (firstPayment)
          cancelBan({
            userId,
            tariff: firstPayment.tariff,
            expiriesAt: firstPayment.expiriesAt,
          });
        else
          cancelBan({
            userId,
            tariff: false,
            expiriesAt: bannedPayment.expiriesAt,
          });

        const agenda = require("../agenta/agenta");
        await agenda.schedule(bannedPayment.expiriesAt, "setTarrifCancel", {
          userId,
        });
      }
    }
    await Ban.deleteMany({ user: userId });
  } catch (error) {
    console.log(error);
  }
}
async function createNotify(user, info, code, type) {
  return new Promise(async (resolve, reject) => {
    let notification = new Notification();
    notification.user = user;
    notification.info = info;
    notification.code = code;
    notification.type = type;
    await notification.save();
    let mailTemplate = mail.find((item) => item.code === notification.code);
    if (mailTemplate) {
      user = await User.findById(user);
      sendMail(user.email, notification, mailTemplate);
    }
    sendNotification({ userId: user._id, notification, isPushSong: true });
    resolve();
  });
}

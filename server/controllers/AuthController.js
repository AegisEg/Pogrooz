/**
 * AuthController.js
 * Author: Vasilev Egor
 */
"use strict";

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const User = require("../models/User");
const Article = require("../models/Article");
const Notification = require("../models/Notification");
const Payment = require("../models/Payment");
const Dialog = require("../models/Dialog");
// const { default: Dialog } = require("../../client/src/Partials/Chat/Dialog");
const NUM_ROUNDS = 12;
module.exports = {
  // Register method
  register: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: User's email
    //  - firstName: User's firstName
    //  - middleName: User's middleName
    //  - lastName: User's lastName
    //  - phone: User's phone
    //  - password: User's password
    //  - type: User's type (cargo or carrier)
    const user = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }

    try {
      // Make sure there isn't an existing user in our database
      const existingUserEmail = await User.findOne({ email: user.email });
      const existingUserPhone = await User.findOne({ phone: user.phone });

      if (existingUserEmail) {
        let err = {};
        err.param = `email`;
        err.msg = `Этот email уже занят`;
        return res.status(409).json({ error: true, errors: [err] });
      }
      if (existingUserPhone) {
        let err = {};
        err.param = `phone`;
        err.msg = `Этот телефон уже занят`;
        return res.status(409).json({ error: true, errors: [err] });
      }
      if (
        !/(?:[а-яёa-z]\d|\d[в-яёa-z])/i.test(user.password) ||
        user.password.length < 8
      ) {
        let err = {};
        err.param = `password`;
        err.msg = `Пароль должен содержать не менее 8-ми цифр и букв `;
        return res.status(409).json({ error: true, errors: [err] });
      }
      /*СОздание юзера*/
      const newUser = new User();
      newUser.name = {
        first: user.firstName,
        middle: user.middleName,
        last: user.lastName,
      };
      newUser.email = user.email;
      newUser.phone = user.phone;
      newUser.country = user.country;
      newUser.type = user.type;
      newUser.password = await bcrypt.hash(user.password, 12);
      await newUser.save();
      let token = generateToken(newUser.id);
      /*СОздание юзера*/

      return res.json({ token, user: newUser });
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
  smsSend: async (req, res, next) => {
    let { phone } = req.body;
    try {
      let code = String(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
      let codeHash = await bcrypt.hash(code, NUM_ROUNDS);
      let error = false;
      await fetch(`https://smscentre.com/sys/send.php`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: "Pogrooz",
          psw: "Hanbikov",
          phones: phone,
          mes: code,
        }),
      }).then((data) => {
        console.log(data);
      });

      return res.json({ error: error, code: codeHash });
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
  uniquePhone: async (req, res, next) => {
    let { phone } = req.body;
    try {
      let unique = false;
      let user = await User.findOne({ phone });
      if (!user) unique = true;
      return res.json({ error: false, unique });
    } catch (e) {
      return next(new Error(e));
    }
  },
  // Login method
  login: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    //  - password: username's password
    const { phone, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }

      // Get the user for this email address
      let user = await User.findOne({ phone }).select("+password");
      if (user) {
        const verifiedPassword = await bcrypt.compare(password, user.password);

        if (verifiedPassword) {
          // Success: generate and respond with the JWT
          let token = generateToken(user.id);
          //Дополнитлеьная информация при авторизации
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

          return res.json({
            token,
            user: user,
            myCountsArticles,
            takeCountsArticles,
            onlyNoRead,
            notificationCounts,
            dialogsCount,
          });
        }
      }
    
    // Unauthorized (HTTP 401)
    const err = {};
    err.param = `all`;
    err.msg = `Неверный логин или пароль`;
    return res.status(401).json({ error: true, errors: [err] });
  },
  forgot: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }
    try {
      // Make sure there is an existing user in our database
      const existingUserEmail = await User.findOne({ email }).select(
        "+resetPasswordExpires"
      );
      if (existingUserEmail) {
        if (
          !existingUserEmail.resetPasswordExpires ||
          existingUserEmail.resetPasswordExpires < Date.now()
        ) {
          //Генерация
          const resetPasswordToken = crypto.randomBytes(20).toString("hex");
          const resetPasswordExpires = Date.now() + 86400000;
          //Генерация

          existingUserEmail.resetPasswordToken = resetPasswordToken;
          existingUserEmail.resetPasswordExpires = resetPasswordExpires;
          existingUserEmail.save();
          //Отправка на почту письма
          return res.json({
            status: "sended",
            email: email,
          });
        }
        //Уже отправлено
        else {
          return res.json({
            status: "waiting",
            email: email,
            time: existingUserEmail.user.resetPasswordExpires - Date.now(),
          });
        }
      } else {
        // Conflict: the resource already exists (HTTP 409)
        const err = {};
        err.param = `email`;
        err.msg = `Пользователь с данной почтой не найден`;
        return res.status(409).json({ error: true, errors: [err] });
      }
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
  reset: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    const { password, token } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }
    try {
      // Make sure there is an existing user in our database

      const existingUserEmail = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gte: Date.now() },
      });

      if (existingUserEmail) {
        existingUserEmail.password = await bcrypt.hash(password, NUM_ROUNDS);
        existingUserEmail.resetPasswordExpires = 0;
        existingUserEmail.save();
        //Сообщение о сбросе пароля
        return res.json({
          status: "success",
        });
      } else {
        // Conflict: the resource already exists (HTTP 409)
        const err = {};
        err.param = `all`;
        err.msg = `Неверный токен`;
        return res.status(409).json({ error: true, errors: [err] });
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
  InfoForLogin: InfoForLogin,
};
// Generates a signed JWT that encodes a user ID
// This function requires:
//  - userId: user to include in the token
function generateToken(userId) {
  // Include some data and an expiration timestamp in the JWT
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // This key expires in 1 hour
      data: { userId },
    },
    process.env.JWT_SECRET
  );
}
async function InfoForLogin(user) {
  let myCountsArticles = await Article.aggregate([
    {
      $match: {
        author: user._id,
        type: user.type === "cargo" ? "order" : "offer",
      },
    },
    {
      $group: {
        _id: "$status",

        count: { $sum: 1 },
      },
    },
  ]);
  let needSendLocation = false;
  if (user.type === "carrier") {
    needSendLocation = await Article.aggregate([
      {
        $match: {
          $or: [
            {
              author: user._id,
            },
            {
              executors: user._id,
            },
          ],
          status: 4,
        },
      },
      {
        $group: {
          _id: "null",
          count: { $sum: 1 },
        },
      },
    ]);
    needSendLocation = needSendLocation && needSendLocation[0].count;
  }
  let takeCountsArticles = await Article.aggregate([
    {
      $match: {
        executors: user._id,
        type: user.type === "cargo" ? "offer" : "order",
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  let onlyNoRead = await Notification.find({
    user: user,
    isRead: false,
  }).sort({ createdAt: -1 });

  let notificationCounts = await Notification.aggregate([
    {
      $match: {
        user: user._id,
        isRead: false,
      },
    },
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 },
      },
    },
  ]);
  let dialogsCount = await Dialog.aggregate([
    {
      $lookup: {
        from: "messages",
        localField: "lastMessage",
        foreignField: "_id",
        as: "lastMessage",
      },
    },
    {
      $match: {
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
        noRead: { $ne: 0 },
        "lastMessage.user": { $ne: user._id },
      },
    },

    {
      $addFields: {
        groupOrder: {
          $cond: {
            if: { $eq: ["$orderId", null] },
            then: "user",
            else: "order",
          },
        },
      },
    },
    {
      $group: {
        _id: "$groupOrder",
        count: { $sum: 1 },
      },
    },
  ]);
  let currentPaymentTariff = await Payment.findOne(
    {
      userId: user._id,
      status: "success",
      expiriesAt: { $gte: new Date() },
    },
    ["tariff"],
    { sort: { expiriesAt: 1 } }
  ).populate("tariff");
  currentPaymentTariff = currentPaymentTariff && currentPaymentTariff.tariff;
  let lastPaymentExpiriesAt = await Payment.findOne(
    {
      userId: user._id,
      status: "success",
    },
    ["expiriesAt"],
    { sort: { expiriesAt: -1 } }
  );
  lastPaymentExpiriesAt =
    lastPaymentExpiriesAt && lastPaymentExpiriesAt.expiriesAt;
  return {
    myCountsArticles,
    takeCountsArticles,
    onlyNoRead,
    notificationCounts,
    dialogsCount,
    currentPaymentTariff,
    lastPaymentExpiriesAt,
    needSendLocation,
  };
}

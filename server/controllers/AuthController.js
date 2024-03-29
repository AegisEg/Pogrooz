/**
 * AuthController.js
 * Author: Vasilev Egor
 */
"use strict";

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
// const fetch = require("node-fetch");
const User = require("../models/User");
const Article = require("../models/Article");
const Notification = require("../models/Notification");
const Payment = require("../models/Payment");
const Dialog = require("../models/Dialog");
const Setting = require("../models/Setting");
var smsc = require("./SmsController");
const { setDemoTariff } = require("./TariffController");
const { sendMailSimple } = require("./MailController");
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
      await sendMailSimple(
        "Добро пожаловать на портал Pogrooz.ru",
        `<div>Здравствуйте, ${newUser.name.last} ${newUser.name.first}</div>
        <div>Вы зарегистрированы в <a href="https://pogrooz.ru">Pogrooz.ru</a>
         в качестве ${
           newUser.type === "carrier" ? "перевозчика" : "грузовладельца"
         }</div>
        <div>Ваши данные для входа:</div>
        <div>Логин ${newUser.phone}</div>
        <div>Пароль ${user.password}</div>
         `,
        newUser.email
      );
      let token = generateToken(newUser.id);
      /*СОздание юзера*/
      if (newUser.type === "carrier") setDemoTariff(newUser._id);
      return res.json({ token, user: newUser });
    } catch (e) {
      return next(new Error(e));
    }
  },
  compareCode: async (req, res, next) => {
    let { code, codeHash } = req.body;
    let compare = await bcrypt.compare(code, codeHash);
    return res.json(compare);
  },
  smsSend: async (req, res, next) => {
    let { phone } = req.body;
    try {
      let code = String(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
      let codeHash = await bcrypt.hash(code, NUM_ROUNDS);
      let error = false;
      // await smsc.send_sms(
      //   {
      //     phones: phone,
      //     mes: "Код подтверждения номера телефона: " + code,
      //   },
      //   function(data, raw, err, code) {
      //     if (err) error = true;
      //   }
      // );
      return res.json({ error: error, codeReal: code, code: codeHash });
    } catch (e) {
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

    try {
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
    } catch (e) {
      return next(new Error(e));
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
          await existingUserEmail.save();
          let infoMail = await Setting.findOne({ key: "email" });
          await sendMailSimple(
            `Запрос на смену пароля на портале Pogrooz.ru`,
            `
            <div>Запрос на смену пароля для логина ${
              existingUserEmail.phone
            }</div>
            <div>Нажмите на кнопку, чтобы сменить пароль. <a style="color:#9509ef;" href="${
              process.env.CLIENT_URL
            }/reset/${resetPasswordToken}">Сменить пароль</a></div>
            <div>Если вы не пытались восстановить доступ к аккаунту, просто не обращайте внимания на это письмо.</div>
            <div>Если у вас появились вопросы или трудности с восстановлением пароля, напишите службе поддержки 
            <a style="color:#9509ef;" href="mailto:${infoMail.value}">${infoMail.value}</a>.</div>`,
            email
          );
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
            time: existingUserEmail.resetPasswordExpires - Date.now(),
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
      return next(new Error(e));
    }
  },
  reset: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    const { password, token } = req.body;

    const errors = validationResult(req);
    if (!/(?:[а-яёa-z]\d|\d[в-яёa-z])/i.test(password) || password.length < 8) {
      let err = {};
      err.param = `password`;
      err.msg = `Пароль должен содержать не менее 8-ми цифр и букв `;
      return res.status(409).json({ error: true, errors: [err] });
    }
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
        await sendMailSimple(
          "Сброс пароля Pogrooz.ru",
          `Пароль в Pogrooz.ru изменен успешно`,
          existingUserEmail.email
        );
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
  isNeedLocation: isNeedLocation,
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
async function isNeedLocation(userId) {
  let needSendLocation = false;
  let needSendLocation1 = false;
  let needSendLocation2 = false;

  needSendLocation1 = await Article.aggregate([
    {
      $match: {
        author: userId,
        status: 4,
      },
    },
    {
      $addFields: {
        isNeed: {
          $cond: {
            if: { $ne: [{ $size: "$executors" }, { $size: "$delivered" }] },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $match: {
        isNeed: 1,
      },
    },
  ]);
  needSendLocation2 = await Article.aggregate([
    {
      $match: {
        executors: userId,
        status: 4,
      },
    },
    {
      $addFields: {
        isNeed: {
          $cond: {
            if: { $ne: [1, { $size: "$delivered" }] },
            then: 1,
            else: 0,
          },
        },
      },
    },
    {
      $match: {
        isNeed: 1,
      },
    },
  ]);
  needSendLocation1 = needSendLocation1.length;
  needSendLocation2 = needSendLocation2.length;
  needSendLocation = needSendLocation1 + needSendLocation2;
  return !!needSendLocation;
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

  let takeCountsArticles = await Article.aggregate([
    {
      $match: {
        executors: user._id,
        type: user.type === "cargo" ? "offer" : "order",
        status: { $gt: 2 },
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  let onemonth = new Date(new Date() - 30 * 24 * 60 * 60 * 1000);
  let onlyNoRead = await Notification.find({
    user: user,
    isRead: false,
    createdAt: { $gte: onemonth },
  }).sort({ createdAt: -1 });
  let notificationCounts = await Notification.aggregate([
    {
      $match: {
        user: user._id,
        isRead: false,
        createdAt: { $gte: onemonth },
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

  let needSendLocation = false;
  if (user.type === "carrier")
    needSendLocation = await isNeedLocation(user._id);
  let currentPaymentTariff = await Payment.findOne(
    {
      userId: user._id,
      status: "success",
      expiriesAt: { $gte: Date.now() },
    },
    ["tariff"],
    { sort: { expiriesAt: 1 } }
  ).populate("tariff");
  currentPaymentTariff = currentPaymentTariff && currentPaymentTariff.tariff;
  let lastPaymentExpiriesAt = await Payment.findOne(
    {
      userId: user._id,
      status: "success",
      expiriesAt: { $gte: Date.now() },
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

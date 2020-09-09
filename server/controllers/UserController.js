/**
 * UserController.js
 * Author: Vasilev Egor
 */
"use strict";

const User = require("../models/User");
const Article = require("../models/Article");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const NUM_ROUNDS = 12;
let { randomString } = require("../controllers/FileController");
const { aggregate } = require("../models/Article");

module.exports = {
  // Get user data
  user: async (req, res, next) => {
    const { userId } = res.locals;
    try {
      // Get this account as JSON
      const user = await User.findById(userId);
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
      });
      if (user) {
        return res.json({
          user,
          myCountsArticles,
          takeCountsArticles,
          noReadNotifications: onlyNoRead.length,
          onlyNoRead,
        });
      }
      const err = new Error(`User ${userId} not found.`);
      err.notFound = true;
      return next(err);
    } catch (e) {
      return next(new Error(e));
    }
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
                type: type === "order" ? "offer" : type,
                status: { $in: [5, 6] },
                executors: user._id,
              },
            },
            {
              $count: "count",
            },
          ]);

          countData.getted = (!!datacount.length && datacount[0].count) || 0;
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
          return res.json({ user, countData });
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
      let emailExist = await User.find({
        email: userChange.email,
        _id: { $ne: user._id },
      });
      if (!emailExist || !emailExist.length) {
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
          } else {
            let err = {};
            err.param = `file`;
            err.msg = `max_size`;
            return res.status(401).json({ error: true, errors: [err] });
          }
        }
        user.contract = userChange.contract;
        user.address = userChange.address;
        user.country = userChange.country;
        user.save();

        return res.json({ user });
      } else
        return res.status(401).json({
          error: true,
          errors: [{ param: "email", msg: "Already exist" }],
        });
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
};

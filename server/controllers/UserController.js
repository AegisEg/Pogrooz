/**
 * UserController.js
 * Author: Vasilev Egor
 */
"use strict";

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const NUM_ROUNDS = 12;
let { randomString } = require("../controllers/FileController");

module.exports = {
  // Get user data
  user: async (req, res, next) => {
    const { userId } = res.locals;
    try {
      // Get this account as JSON
      const user = await User.findById(userId);
      if (user) {
        return res.send(user);
      }
      const err = new Error(`User ${userId} not found.`);
      err.notFound = true;
      return next(err);
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

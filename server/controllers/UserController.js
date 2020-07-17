/**
 * UserController.js
 * Author: Vasilev Egor
 */
"use strict";

const User = require("../models/User");

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
};

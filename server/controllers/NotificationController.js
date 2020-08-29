/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Notification = require("../models/Notification");
const { readNotification } = require("./SocketController");

module.exports = {
  createNotify: async (user, info, code, type) => {
    return new Promise(async (resolve, reject) => {
      let notification = new Notification();
      notification.user = user;
      notification.info = info;
      notification.code = code;
      notification.type = type;
      await notification.save();
      sendNotification({ userId: user._id, notification });
      resolve();
    });
  },

  getAll: async (req, res, next) => {
    const { user } = res.locals;
    try {
      let oneweekago = new Date() - 7 * 24 * 60 * 60 * 1000;
      const notifications = await Notification.find({
        user: user._id,
        createdAt: { $gte: oneweekago },
      }).sort({ createdAt: "DESC" });
      return res.json(notifications);
    } catch (e) {
      return next(new Error(e));
    }
  },

  read: async (req, res, next) => {
    const { user } = res.locals;
    const { id, socketId } = req.body;

    try {
      await Notification.updateOne(
        { user: user._id, _id: id },
        { isRead: true }
      );
      readNotification({ socketId, userId: user._id, id });
      return res.json();
    } catch (e) {
      return next(new Error(e));
    }
  },
};

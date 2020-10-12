/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Notification = require("../models/Notification");
const { readNotification } = require("./SocketController");

module.exports = {
  getAll: async (req, res, next) => {
    const { user } = res.locals;
    let { type, offset } = req.body;
    
    try {
      let oneweekago = new Date() - 7 * 24 * 60 * 60 * 1000;
      let filter = {
        user: user._id,
        createdAt: { $gte: oneweekago },
      };
      if (type !== "all") filter.type = type;
      let notifications;
      if (offset) {
        notifications = await Notification.find(filter)
          .sort({
            createdAt: "DESC",
          })
          .skip(offset)
          .limit(10);
      } else
        notifications = await Notification.find(filter)
          .sort({
            createdAt: "DESC",
          })
          .limit(10);
      return res.json({ notifications });
    } catch (e) {
      return next(new Error(e));
    }
  },

  read: async (req, res, next) => {
    const { user } = res.locals;
    const { id, socketId } = req.body;

    try {
      let notify = await Notification.findOneAndUpdate(
        { user: user._id, _id: id },
        { isRead: true }
      );
      readNotification({ socketId, userId: user._id, id, type: notify.type });
      return res.json();
    } catch (e) {
      return next(new Error(e));
    }
  },
};

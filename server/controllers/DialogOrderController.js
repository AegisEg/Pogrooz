/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Dialog = require("../models/Dialog");
const Message = require("../models/Message");
const Article = require("../models/Article");
const User = require("../models/User");
let count = 20;
module.exports = {
  getAll: async (req, res, next) => {
    const { user } = res.locals;
    const { orderId } = req.body;
    try {
      const dialogs = await Dialog.find({
        orderId: { $ne: null },
        users: { $all: [user._id] },
      })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "onlineAt", "color"],
          },
          {
            path: "orderId",
          },
          {
            path: "lastMessage",
            populate: {
              path: "user",
            },
          },
        ])
        .sort({ updatedAt: -1 })
        .limit(count);

      const noReadDialogs = await Dialog.find({
        orderId: orderId,
        orderId: { $ne: null },
        noRead: { $ne: 0 },
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
      }).populate([
        {
          path: "users",
          select: ["_id"],
        },
        {
          path: "orderId",
        },
        {
          path: "lastMessage",
          populate: {
            path: "user",
          },
        },
      ]);

      let noReadCount = 0;
      if (noReadDialogs) {
        noReadDialogs.map((x) => {
          if (String(x.lastMessage.user._id) != String(user._id)) {
            noReadCount++;
          }
        });
      }
      return res.json({ dialogs, noReadCount });
    } catch (e) {
      return next(new Error(e));
    }
  },
  get: async (req, res, next) => {
    const { user } = res.locals;
    let { userId, orderId } = req.body;

    try {
      let existUser;
      if (userId.match(/^[0-9a-fA-F]{24}$/)) {
        existUser = await User.findById(userId);
        if (!existUser) {
          const err = {};
          err.param = `all`;
          err.msg = `User not found`;
          return res
            .status(401)
            .json({ dialog: { error: true }, errors: [err] });
        }
      } else {
        const err = {};
        err.param = `all`;
        err.msg = `User not found`;
        return res.status(401).json({ dialog: { error: true }, errors: [err] });
      }
      let query =
        userId == user._id
          ? { $eq: [user._id] }
          : { $all: [user._id, existUser._id] };

      let dialog = await Dialog.findOne({ orderId: orderId, users: query })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "onlineAt", "color"],
          },
          {
            path: "messages",
          },
          {
            path: "orderId",
          },
          {
            path: "lastMessage",
          },
        ])
        .sort({ createdAt: 1 });
      if (!dialog) {
        let article = await Article.findById(orderId).populate([
          {
            path: "author",
          },
        ]);
        //Определение пары в заказе
        let author = false;
        let executor = false;
        if (article && compareId(article.author._id, existUser._id))
          author = existUser;
        if (article && compareId(article.author._id, user._id)) author = user;
        if (
          article &&
          article.executors.find((item) => compareId(item, existUser._id))
        )
          executor = existUser;
        if (
          article &&
          article.executors.find((item) => compareId(item, user._id))
        )
          executor = user;
        //Определение пары в заказе
        if (
          (!article || [1, 2, 7].find((item) => item === article.status)) &&
          !author &&
          !executor
        ) {
          const err = {};
          err.param = `all`;
          err.msg = `Dialog not found`;
          return res
            .status(401)
            .json({ dialog: { error: true }, errors: [err] });
        }
        dialog = new Dialog();
        dialog.users = [author, executor];
        dialog.orderId = article;
        await dialog.save();
      }

      let messages = await Message.find({
        dialogId: dialog._id,
      })
        .populate([
          {
            path: "user",
            select: ["_id", "email", "name", "online", "color"],
          },
          {
            path: "recentMessage",
            populate: [
              {
                path: "user",
                select: ["_id", "email", "name", "online", "color"],
              },
              {
                path: "recentMessage",
                populate: {
                  path: "user",
                  select: ["_id", "email", "name", "online", "color"],
                },
              },
            ],
          },
        ])
        .sort({ createdAt: "DESC" })
        .limit(50);

      return res.json({ dialog, messages });
    } catch (e) {
      return next(new Error(e));
    }
  },
  //Все диалоги
  getAllDialog: async (req, res, next) => {
    const { user } = res.locals;
    const { orderId } = req.body;
    try {
      const dialogs = await Dialog.find({
        users: { $all: [user._id] },
      })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "onlineAt", "color"],
          },
          {
            path: "orderId",
          },
          {
            path: "lastMessage",
            populate: {
              path: "user",
            },
          },
        ])
        .sort({ updatedAt: -1 })
        .limit(count);

      const noReadDialogs = await Dialog.find({
        orderId: orderId,
        noRead: { $ne: 0 },
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
      }).populate([
        {
          path: "users",
          select: ["_id"],
        },
        {
          path: "orderId",
        },
        {
          path: "lastMessage",
          populate: {
            path: "user",
          },
        },
      ]);

      let noReadCount = 0;
      if (noReadDialogs) {
        noReadDialogs.map((x) => {
          if (String(x.lastMessage.user._id) != String(user._id)) {
            noReadCount++;
          }
        });
      }
      return res.json({ dialogs, noReadCount });
    } catch (e) {
      return next(new Error(e));
    }
  },
};
function compareId(id1, id2) {
  return String(id1) === String(id2);
}

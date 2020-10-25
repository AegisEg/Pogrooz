/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Dialog = require("../models/Dialog");
const Message = require("../models/Message");
const User = require("../models/User");
const Notification = require("../models/Notification");
let { randomString } = require("../controllers/FileController");
const {
  sendMessageDialog,
  readMessageDialog,
  sendNotification,
} = require("./SocketController");
const mail = require("../config/mail");
let { sendMail } = require("../controllers/MailController");
let count = 20;
module.exports = {
  getAll: async (req, res, next) => {
    const { user } = res.locals;

    try {
      const dialogs = await Dialog.find({
        orderId: null,
        users: { $all: [user._id] },
      })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "onlineAt", "color"],
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
        noRead: { $ne: 0 },
        orderId: null,
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
      }).populate([
        {
          path: "users",
          select: ["_id"],
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
    let { userId } = req.body;

    try {
      if (userId.match(/^[0-9a-fA-F]{24}$/)) {
        let existUser = await User.findById(userId);

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
        userId == user._id ? { $eq: [user._id] } : { $all: [user._id, userId] };

      let dialog = await Dialog.findOne({ orderId: null, users: query })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "onlineAt", "color"],
          },
          {
            path: "messages",
          },
          {
            path: "lastMessage",
          },
        ])
        .sort({ createdAt: 1 });
      if (!dialog) {
        if (userId == user._id) {
          const err = {};
          err.param = `all`;
          err.msg = `Dialog not found`;
          return res
            .status(401)
            .json({ dialog: { error: true }, errors: [err] });
        }
        dialog = new Dialog();
        let userTo = await User.findById(userId);

        dialog.users = [user, userTo];

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
  load: async (req, res, next) => {
    const { user } = res.locals;
    let { lastDialogId, type } = req.body;

    try {
      let dialog = await Dialog.findById(lastDialogId);
      let filter = {
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
        updatedAt: { $lt: dialog.updatedAt },
      };
      if (type === "user") filter.orderId = null;
      if (type === "order") filter.orderId = { $ne: null };
      const dialogs = await Dialog.find(filter)
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "color", "onlineAt"],
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

      return res.json({ dialogs });
    } catch (e) {
      return next(new Error(e));
    }
  },
  loadFile: (req, res, next) => {
    const { user } = res.locals;
    if (req.files["file"].size / 1000 <= 10000) {
      let fileName = randomString(24);
      let filePath =
        "./uploads/" +
        user._id +
        "/" +
        fileName +
        "." +
        req.files["file"].name.split(".").pop();
      req.files["file"].mv(filePath, function(err) {
        if (err) return res.status(500).send(err);
      });
      return res.json({
        path:
          process.env.API_URL +
          "/media/" +
          user._id +
          "/" +
          fileName +
          "." +
          req.files["file"].name.split(".").pop(),
        name: req.files["file"].name,
        size: req.files["file"].size,
      });
    } else {
      let err = {};
      err.param = `all`;
      err.msg = `max_size`;
      return res.status(401).json({ error: true, errors: [err] });
    }
  },
  sendMessage: async (req, res, next) => {
    const { user } = res.locals;
    let {
      userId,
      text,
      socketId,
      recentMessage,
      voiceSoundDuration,
      voiceSoundRecordLine,
      dialog,
    } = req.body;
    try {
      let query =
        userId == user._id ? { $eq: [user._id] } : { $all: [user._id, userId] };
      dialog = await Dialog.findOne({
        _id: dialog,
        users: query,
      })
        .populate("lastMessage")
        .populate("orderId");
      let orderId = dialog.orderId;
      const dialogId = String(dialog._id);
      if (
        !/\S/.test(text) &&
        !recentMessage &&
        !req.files &&
        !req.body["images"] &&
        !req.body["files"] &&
        !req.body["sounds"]
      ) {
        let err = {};
        err.param = `all`;
        err.msg = `empty_message`;
        return res.status(401).json({ error: true, errors: [err] });
      }

      let message = new Message();

      let images = [];
      let sounds = [];
      let files = [];
      let voiceSound = false;
      if (req.files) {
        if (req.files["voiceSound"]) {
          let fileName = randomString(24);
          if (req.files["voiceSound"].size / 1000 <= 10000) {
            let filePath = "./uploads/" + user._id + "/" + fileName + ".mp3";
            req.files["voiceSound"].mv(filePath, function(err) {
              if (err) return res.status(500).send(err);
            });
            voiceSound = {
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                ".mp3",
              name: "Аудиозапись",
              duration: voiceSoundDuration,
              recordLine: voiceSoundRecordLine.split(","),
            };
          }
        }
      }

      let maxCount = 10;
      let nowCount = 1;
      if (req.body["images"]) {
        req.body["images"] = JSON.parse(req.body["images"]);
        for (let i = 0; i < 10; i++) {
          if (!req.body["images"][i] || nowCount >= maxCount) break;
          images.push({
            path: req.body["images"][i].path,
            name: req.body["images"][i].name,
          });
          nowCount++;
        }
      }
      if (req.body["sounds"]) {
        req.body["sounds"] = JSON.parse(req.body["sounds"]);
        for (let i = 0; i < 10; i++) {
          if (!req.body["sounds"][i] || nowCount >= maxCount) break;
          sounds.push({
            path: req.body["sounds"][i].path,
            name: req.body["sounds"][i].name,
            duration: req.body["sounds"][i].duration,
            recordLine: req.body["sounds"][i].recordLine,
          });
          nowCount++;
        }
      }
      if (req.body["files"]) {
        req.body["files"] = JSON.parse(req.body["files"]);
        for (let i = 0; i < 10; i++) {
          if (!req.body["files"][i] || nowCount >= maxCount) break;

          files.push({
            path: req.body["files"][i].path,
            name: req.body["files"][i].name,
            size: req.body["files"][i].size,
          });
          nowCount++;
        }
      }

      message.text = text
        .replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "")
        .replace(/(\r\n|\r|\n){2,}/g, "$1\n");
      message.user = user;
      message.dialogId = dialogId;
      message.images = images;
      message.sounds = sounds;
      message.voiceSound = voiceSound;
      message.files = files;
      if (recentMessage !== "undefined") {
        message.recentMessage = await Message.findById(recentMessage).populate([
          {
            path: "user",
            select: ["_id", "email", "name", "online", "color"],
          },
          {
            path: "recentMessages",
            populate: [
              {
                path: "user",
                select: ["_id", "email", "name", "online", "color"],
              },
              {
                path: "recentMessages",
                populate: {
                  path: "user",
                  select: ["_id", "email", "name", "online", "color"],
                },
              },
            ],
          },
        ]);
      }

      await message.save();

      dialog.lastMessage = message;
      dialog.noRead = dialog.noRead + 1;
      dialog.updatedAt = new Date();

      await dialog.save();
      let toUser = await User.findById(userId);
      if (!toUser.online) {
        let lastNotificationMessage = await Notification.find({
          code: "SEND_NEW_MESSAGE",
          user: toUser._id,
          createdAt: { $gte: Date.now() - 1000 * 60 * 60 * 3 },
        })
          .limit(1)
          .sort({ createdAt: -1 });
        if (!lastNotificationMessage.length) {
          if (orderId) {
            createNotify(
              { _id: userId },
              {
                articleType: dialog.orderId.type,
                articleId: dialog.orderId.articleId,
              },
              "SEND_NEW_MESSAGE_BY_ORDER",
              "system",
              (dialog.orderId.type === "offer" &&
                toUser.notificationSettings.offer_new_message.push) ||
                (dialog.orderId.type === "order" &&
                  toUser.notificationSettings.order_new_message.push),
              (dialog.orderId.type === "offer" &&
                toUser.notificationSettings.offer_new_message.mail) ||
                (dialog.orderId.type === "order" &&
                  toUser.notificationSettings.order_new_message.mail)
            );
          } else
            createNotify(
              { _id: userId },
              {},
              "SEND_NEW_MESSAGE",
              "system",
              toUser.notificationSettings.user_new_message.push,
              toUser.notificationSettings.user_new_message.mail
            );
        }
      }
      sendMessageDialog({
        userId: user._id,
        otherId: userId,
        socketId,
        message,
        orderId,
        countNoread: dialog.noRead,
      });
      return res.json(message);
    } catch (e) {
      return next(new Error(e));
    }
  },

  loadMessage: async (req, res, next) => {
    const { user } = res.locals;
    let { dialogId, lastMessageId } = req.body;
    try {
      let dialog = await Dialog.findOne({
        _id: dialogId,
        users: { $all: [user._id] },
      });

      let messages = await Message.find({
        dialogId: dialog._id,
        _id: { $lt: lastMessageId },
      })
        .populate([
          {
            path: "user",
            select: ["_id", "email", "name", "online"],
          },
          {
            path: "recentMessage",
            populate: [
              {
                path: "user",
                select: ["_id", "email", "name", "online"],
              },
              {
                path: "recentMessages",
                populate: {
                  path: "user",
                  select: ["_id", "email", "name", "online"],
                },
              },
            ],
          },
        ])
        .sort({ createdAt: "DESC" })
        .limit(50);

      return res.json(messages);
    } catch (e) {
      return next(new Error(e));
    }
  },

  readMessages: async (req, res, next) => {
    const { user } = res.locals;
    const { otherId, socketId, dialogId } = req.body;

    try {
      let query = { $all: [user._id, otherId] };
      let dialog = await Dialog.findOne({ _id: dialogId, users: query });

      let result = await Message.updateMany(
        { dialogId: dialog._id, user: { $ne: user._id } },
        { $set: { isRead: true } }
      );
      dialog.noRead = 0;
      await dialog.save();
      if (result.nModified) {
        readMessageDialog({
          otherId,
          dialogId: dialog._id,
          userId: user._id,
          socketId,
          isOrder: !!dialog.orderId,
        });
      }

      return res.json();
    } catch (e) {
      return next(new Error(e));
    }
  },
};
async function createNotify(
  user,
  info,
  code,
  type,
  isPushSong = true,
  isMail = true
) {
  return new Promise(async (resolve, reject) => {
    let notification = new Notification();
    notification.user = user;
    notification.info = info;
    notification.code = code;
    notification.type = type;

    if (isMail) {
      let mailTemplate = mail.find((item) => item.code === notification.code);
      if (mailTemplate) {
        user = await User.findById(user);
        sendMail(user.email, notification, mailTemplate);
      }
    }

    await notification.save();
    sendNotification({ userId: user._id, notification, isPushSong });

    resolve();
  });
}

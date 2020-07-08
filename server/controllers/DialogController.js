/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Dialog = require("../models/Dialog");
const Message = require("../models/Message");
const Investment = require("../models/Investment");
const User = require("../models/User");

const {
  sendMessageDialog,
  readMessageDialog,
  editMessageDialog,
  deleteMessageDialog,
} = require("./SocketController");

module.exports = {
  getAll: async (req, res, next) => {
    const { user } = res.locals;

    try {
      const dialogs = await Dialog.find({ users: { $all: [user._id] } })
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
        .sort({ updatedAt: "DESC" })
        .limit(20);

      const noReadDialogs = await Dialog.find({
        noRead: { $ne: 0 },
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

      let dialog = await Dialog.findOne({ users: query })
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
        .sort({ createdAt: "DESC" });
      if (!dialog) {
        dialog = new Dialog();
        let userTo = await User.findById(userId);

        dialog.users = userId == user._id ? [user] : [user, userTo];

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
    let { lastDialogId, firstDialogId } = req.body;

    try {
      const dialogs = await Dialog.find({
        users: { $all: [user._id] },
        lastMessage: { $exists: true },
        _id: { $gt: lastDialogId, $lt: firstDialogId },
      })
        .populate([
          {
            path: "users",
            select: ["_id", "name", "online", "color", "onlineAt"],
          },
          {
            path: "lastMessage",
            populate: {
              path: "user",
            },
          },
        ])
        .sort({ updatedAt: "ASC" })
        .limit(20);

      return res.json(dialogs);
    } catch (e) {
      return next(new Error(e));
    }
  },
  sendMessage: async (req, res, next) => {
    const { user } = res.locals;
    let { userId, text, socketId, recentMessage } = req.body;

    try {
      let query =
        userId == user._id ? { $eq: [user._id] } : { $all: [user._id, userId] };
      let dialog = await Dialog.findOne({ users: query }).populate(
        "lastMessage"
      );
      const dialogId = String(dialog._id);

      if (!/\S/.test(text) && !recentMessage && !req.files) {
        let err = {};
        err.param = `all`;
        err.msg = `empty_message`;
        return res.status(401).json({ error: true, errors: [err] });
      }

      let message = new Message();

      let images = [];
      let sounds = [];
      let files = [];

      if (req.files) {
        let maxCount = 10;
        let nowCount = 1;

        for (let i = 0; i < 10; i++) {
          let fileName = randomString(24);

          if (!req.files["images" + i] || nowCount >= maxCount) break;

          if (req.files["images" + i].size / 1000 <= 10000) {
            req.files["images" + i].mv(
              "./uploads/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["images" + i].name.split(".").pop(),
              function(err) {
                if (err) return res.status(500).send(err);
              }
            );

            let investment = new Investment();

            investment.dialogId = dialogId;
            investment.type = "image";
            investment.data = {
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["images" + i].name.split(".").pop(),
            };

            await investment.save();

            images.push({
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["images" + i].name.split(".").pop(),
              name: req.files["images" + i].name,
            });
            nowCount++;
          } else {
            let err = {};
            err.param = `all`;
            err.msg = `max_size`;
            return res.status(401).json({ error: true, errors: [err] });
          }
        }

        for (let i = 0; i < 10; i++) {
          let fileName = randomString(24);

          if (!req.files["sounds" + i] || nowCount >= maxCount) break;

          if (req.files["sounds" + i].size / 1000 <= 10000) {
            req.files["sounds" + i].mv(
              "./uploads/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["sounds" + i].name.split(".").pop(),
              function(err) {
                if (err) return res.status(500).send(err);
              }
            );

            let investment = new Investment();

            investment.dialogId = dialogId;
            investment.type = "sound";
            investment.data = {
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["sounds" + i].name.split(".").pop(),
              name: req.files["sounds" + i].name,
            };

            await investment.save();

            sounds.push({
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["sounds" + i].name.split(".").pop(),
              name: req.files["sounds" + i].name,
            });
            nowCount++;
          } else {
            let err = {};
            err.param = `all`;
            err.msg = `max_size`;
            return res.status(401).json({ error: true, errors: [err] });
          }
        }

        for (let i = 0; i < 10; i++) {
          let fileName = randomString(24);

          if (!req.files["files" + i] || nowCount >= maxCount) break;

          if (req.files["files" + i].size / 1000 <= 10000) {
            req.files["files" + i].mv(
              "./uploads/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["files" + i].name.split(".").pop(),
              function(err) {
                if (err) return res.status(500).send(err);
              }
            );

            let investment = new Investment();

            investment.dialogId = dialogId;
            investment.type = "file";
            investment.data = {
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["files" + i].name.split(".").pop(),
              name: req.files["files" + i].name,
              size: req.files["files" + i].size / 1000,
            };

            await investment.save();

            files.push({
              path:
                process.env.API_URL +
                "/media/" +
                user._id +
                "/" +
                fileName +
                "." +
                req.files["files" + i].name.split(".").pop(),
              name: req.files["files" + i].name,
              size: req.files["files" + i].size / 1000,
            });
            nowCount++;
          } else {
            let err = {};
            err.param = `all`;
            err.msg = `max_size`;
            return res.status(401).json({ error: true, errors: [err] });
          }
        }
      }

      message.text = text
        .replace(/(^\s*(?!.+)\n+)|(\n+\s+(?!.+)$)/g, "")
        .replace(/(\r\n|\r|\n){2,}/g, "$1\n");
      message.user = user;
      message.dialogId = dialogId;
      message.images = images;
      message.sounds = sounds;
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

      sendMessageDialog({
        userId: user._id,
        otherId: userId,
        socketId,
        message,
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
    const { otherId, socketId } = req.body;

    try {
      let query = { $all: [user._id, otherId] };
      let dialog = await Dialog.findOne({ users: query });
      const dialogId = String(dialog._id);
      let result = await Message.updateMany(
        { dialogId, user: { $ne: user._id } },
        { $set: { isRead: true } }
      );
      dialog.noRead = 0;
      await dialog.save();
      if (result.nModified) {
        readMessageDialog({ otherId, dialogId, userId: user._id, socketId });
      }

      return next();
    } catch (e) {
      return next(new Error(e));
    }
  },

  getInvestments: async (req, res, next) => {
    const { user } = res.locals;
    const { type, userId } = req.body;

    try {
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.json([]);
      }

      let query = { $all: [user._id, userId] };
      let dialog = await Dialog.findOne({ users: query }).populate(
        "lastMessage"
      );

      if (!dialog) {
        return res.json([]);
      }

      const dialogId = String(dialog._id);

      let investments = await Investment.find({ dialogId, type })
        .sort({ createdAt: "DESC" })
        .limit(20);

      if (investments) {
        return res.json(investments);
      } else {
        return res.json([]);
      }
    } catch (e) {
      return next(new Error(e));
    }
  },
};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function randomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

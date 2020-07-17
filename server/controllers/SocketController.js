const jwt = require("jsonwebtoken");
const User = require("../models/User");

let io = false;

function initSocket(initIo) {
  io = initIo;
  io.on("connection", (socket) => {
    let isAuth = false;
    let user = false;
    let disconnectTimer = setTimeout(() => {
      socket.disconnect("Unauthorized");
    }, 10000);
    socket.on("auth", async (apiToken) => {
      clearTimeout(disconnectTimer);
      try {
        var userVerify = jwt.verify(apiToken, process.env.JWT_SECRET);
      } catch (e) {
        socket.disconnect("Unauthorized");
        return;
      }

      if (!userVerify.data.userId) {
        socket.disconnect("Unauthorized");
        return;
      }

      // Set online status for user
      user = await User.findById(userVerify.data.userId);
      if (user) {
        socket.join(`user.${user._id}`);
        user.update({
          onlineAt: new Date().toLocaleString(),
          online: true,
        });
      }
    });
    socket.on("disconnect", async () => {
      if (user) {
        user.update({
          onlineAt: new Date().toLocaleString(),
          online: false,
        });
      }
    });
    socket.on("typingDialog", ({ otherId, userId }) => {
      if (userId == user._id)
        socket.to(`user.${otherId}`).emit("typingDialog", userId);
    });
  });
}
// Chat dialog
function sendMessageDialog({ userId, socketId, otherId, message }) {
  if (userId != otherId) {
    io.sockets.connected[socketId]
      .to(`user.${otherId}`)
      .emit("sendMessageDialog", { message, otherId: userId });
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("sendMessageDialog", { message, otherId });
  } else {
    io.sockets.connected[socketId]
      .to(`user.${otherId}`)
      .emit("sendMessageDialog", { message, otherId: userId });
  }
}

function readMessageDialog({ dialogId, userId, otherId, socketId }) {
  io.sockets.connected[socketId]
    .to(`user.${otherId}`)
    .emit("readMessagesDialog", { dialogId, userId: otherId });
  io.sockets.connected[socketId]
    .to(`user.${userId}`)
    .emit("readMessagesDialog", { dialogId, userId: otherId });
}

module.exports = {
  initSocket,
  sendMessageDialog,
  readMessageDialog,
};

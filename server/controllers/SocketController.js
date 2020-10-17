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
        user.online = true;
        await user.save();
      }
    });
    socket.on("disconnect", async () => {
      if (user) {
        user.onlineAt = Date.now();
        user.online = false;
        await user.save();
      }
    });
    socket.on("typingDialog", ({ otherId, userId, isOrder }) => {
      if (userId == user._id)
        socket.to(`user.${otherId}`).emit("typingDialog", userId, isOrder);
    });
  });
}
// Chat dialog
function sendMessageDialog({
  userId,
  socketId,
  otherId,
  message,
  orderId,
  countNoread,
}) {
  if (userId != otherId) {
    if (io.sockets.connected[socketId])
      io.sockets.connected[socketId]
        .to(`user.${otherId}`)
        .emit("sendMessageDialog", {
          message,
          otherId: userId,
          orderId,
          countNoread,
          isMy: false,
        });
    if (io.sockets.connected[socketId])
      io.sockets.connected[socketId]
        .to(`user.${userId}`)
        .emit("sendMessageDialog", {
          message,
          otherId,
          orderId,
          countNoread,
          isMy: true,
        });
  } else {
    if (io.sockets.connected[socketId])
      io.sockets.connected[socketId]
        .to(`user.${otherId}`)
        .emit("sendMessageDialog", {
          message,
          otherId: userId,
          isOrder,
          countNoread,
          isMy: false,
        });
  }
}
function createTakingArticle({ userId, article }) {
  io.to(`user.${userId}`).emit("createTakingArticle", { status: 3, article });
}
function setTariff({ userId, tariff, expiriesAt }) {
  io.to(`user.${userId}`).emit("setTariff", {
    tariff,
    expiriesTariffAt: expiriesAt,
  });
}
function setBan({ userId }) {
  io.to(`user.${userId}`).emit("setBan", {});
}
function cancelBan({ userId, tariff, expiriesAt }) {
  io.to(`user.${userId}`).emit("cancelBan", {
    tariff,
    expiriesTariffAt: expiriesAt,
  });
}
function donTariff({ userId }) {
  io.to(`user.${userId}`).emit("dontTariff", {});
}
function setLocationSoket({ userId, articleId, location }) {
  io.to(`user.${userId}`).emit("setLocation", {
    articleId,
    location,
  });
}
function createMyArticle({ userId, socketId, status, article }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("createMyArticle", { status, article });
}
function modarationSuccess({ userId }) {
  io.to(`user.${userId}`).emit("modarationSuccess", {});
}

function modarationFail({ userId }) {
  io.to(`user.${userId}`).emit("modarationFail", {});
}

function updateStatusMyArticle({
  userId,
  socketId,
  lastStatus,
  article,
  isTaking,
}) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("updateStatusMyArticle", { lastStatus, article, isTaking });
}
function updateStatusArticle({ userId, lastStatus, article }) {
  io.to(`user.${userId}`).emit("updateStatusMyArticle", {
    lastStatus,
    article,
    isTaking: false,
  });
}
function deleteTaking({ userId, socketId, lastStatus, articleID }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("deleteTaking", { lastStatus, articleID });
}
function editMyArticle({ userId, socketId, status, article }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("editMyArticle", { status, article });
}

function readMessageDialog({ dialogId, userId, otherId, socketId, isOrder }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${otherId}`)
      .emit("readMessagesDialog", { dialogId, userId: otherId, isOrder });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("readMessagesDialog", { dialogId, userId: otherId, isOrder });
}

function updateArticleReview({
  article,
  newReview,
  myUser,
  takingUser,
  socketId,
}) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${takingUser}`)
      .emit("updateArticleReview", {
        articleID: article._id,
        articleStatus: article.status,
        newReview: newReview,
        isTaking: false,
      });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${myUser}`)
      .emit("updateArticleReview", {
        articleID: article._id,
        articleStatus: article.status,
        newReview: newReview,
        isTaking: true,
      });
}
function setExecutor({ article, executor, lastStatus, userId, socketId }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${userId}`).emit("setExecutor", {
      article: article,
      lastStatus: lastStatus,
      executor: executor,
    });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${executor._id}`)
      .emit("setExecutor", {
        article: article,
        lastStatus: lastStatus,
        executor: executor,
        isTaking: true,
      });
}
function deleteExecutorSoket({
  article,
  executor,
  lastStatus,
  userId,
  socketId,
}) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${userId}`).emit("deleteExecutor", {
      article: article,
      lastStatus: lastStatus,
      executor: executor,
    });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${executor._id}`)
      .emit("deleteExecutor", {
        article: article,
        lastStatus: lastStatus,
        executor: executor,
        isTaking: true,
      });
}
function createArticleReview({
  article,
  newReview,
  userId,
  otherId,
  socketId,
}) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("createArticleReview", {
        articleID: article._id,
        articleStatus: article.status,
        newReview: newReview,
        isTaking: !compareId(article.author._id, userId),
      });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${otherId}`)
      .emit("createArticleReview", {
        articleID: article._id,
        articleStatus: article.status,
        newReview: newReview,
        isTaking: !compareId(article.author._id, otherId),
      });
}
function createRequestSoket({ article, request, userId, socketId }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${userId}`).emit("createRequest", {
      article,
      request,
    });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${request.author._id}`)
      .emit("createRequest", {
        article,
        request,
      });
}
function setDelivered({ article, user, userId, otherId, socketId }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${userId}`).emit("setDelivered", {
      article,
      user,
    });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${otherId}`).emit("setDelivered", {
      article,
      user,
    });
}
function updateRequestSoket({ article, request, userId, socketId }) {
  io.to(`user.${userId}`).emit("updateRequest", {
    article,
    request,
  });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${request.author._id}`)
      .emit("updateRequest", {
        article,
        request,
      });
}
function deleteRequestSoket({ article, requestId, userId, otherId, socketId }) {
  io.to(`user.${userId}`).emit("deleteRequest", {
    article,
    requestId,
  });
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId].to(`user.${otherId}`).emit("deleteRequest", {
      article,
      requestId,
    });
}
// Notifications
function sendNotification({ userId, notification }) {
  io.to(`user.${userId}`).emit("sendNotification", notification);
}
function readNotificationAll({ socketId, userId }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("readNotificationAll", {});
}
function readNotification({ socketId, userId, id, type }) {
  if (io.sockets.connected[socketId])
    io.sockets.connected[socketId]
      .to(`user.${userId}`)
      .emit("readNotification", { id, type });
}
function compareId(id1, id2) {
  return String(id1) === String(id2);
}
module.exports = {
  initSocket,
  sendMessageDialog,
  readMessageDialog,
  editMyArticle,
  createMyArticle,
  updateStatusMyArticle,
  createTakingArticle,
  deleteTaking,
  updateArticleReview,
  createArticleReview,
  setExecutor,
  deleteExecutorSoket,
  createRequestSoket,
  deleteRequestSoket,
  updateRequestSoket,
  sendNotification,
  readNotification,
  setDelivered,
  setTariff,
  setLocationSoket,
  donTariff,
  setBan,
  cancelBan,
  modarationSuccess,
  modarationFail,
  updateStatusArticle,
  readNotificationAll,
};

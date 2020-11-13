const Tariff = require("../models/Tariff");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const {
  setTariff,
  sendNotification,
} = require("../controllers/SocketController");
let { sendMail } = require("../controllers/MailController");
const User = require("../models/User");
const request = require("request");
const ip = require("ip");
const mail = require("../config/mail");
const orderLink = "https://3dsec.sberbank.ru/payment/rest/registerPreAuth.do";
const statusLink = "https://3dsec.sberbank.ru/payment/rest/getOrderStatus.do";
const finishLink = "https://3dsec.sberbank.ru/payment/rest/deposit.do";
const statusLinkAuto =
  "https://3dsec.sberbank.ru/payment/rest/getOrderStatusExtended.do";
const getBindings = "https://3dsec.sberbank.ru/payment/rest/getBindings.do";
const unBindCard = "https://3dsec.sberbank.ru/payment/rest/unBindCard.do";
const paymentOrderBinding =
  "https://3dsec.sberbank.ru/payment/rest/paymentOrderBinding.do";
const reverseDo = "https://3dsec.sberbank.ru/payment/rest/reverse.do";

module.exports = {
  getTariffs: async (req, res, next) => {
    try {
      let tariffs = await Tariff.find({ isEnable: true }).sort({ price: 1 });
      return res.json({ tariffs });
    } catch (e) {
      return next(new Error(e));
    }
  },
  payments: async (req, res, next) => {
    const { user } = res.locals;
    let { page } = req.body;
    try {
      let payments = await Payment.find({
        userId: user._id,
        status: "success",
      })
        .sort({ expiriesAt: -1 })
        .skip(page * 6)
        .limit(6)
        .populate("tariff");
      let countAll =
        (await Payment.find({
          userId: user._id,
          status: "success",
        }).count()) / 6;
      return res.json({ payments: payments.reverse(), countAll });
    } catch (e) {
      return next(new Error(e));
    }
  },
  getMyAutoPayments: async (req, res, next) => {
    let { user } = res.locals;
    try {
      let params = {};
      user = await User.findById(user._id).select("bindingIdCard");
      params.clientId = user._id;
      params.userName = process.env.SB_USERNAME;
      params.password = process.env.SB_PASSWORD;
      let response = await sendRequest(getBindings, "GET", params);
      return res.json({
        cards: response.bindings,
        bindingIdCard: user.bindingIdCard,
      });
    } catch (e) {
      return next(new Error(e));
    }
  },
  sendNotifyTariffCanсel: (userId, tariffName) => {
    createNotify(
      userId,
      { tariffName: tariffName },
      "TARIFF_WILL_CANCEL",
      "system"
    );
  },
  autoPayment: async (user, bindingId) => {
    try {
      let tariff = await Tariff.findOne({ duration: 30 });
      if (user.type === "carrier" && tariff) {
        let lastPaymentExpiriesAt = await Payment.findOne(
          {
            userId: user._id,
            status: "success",
            expiriesAt: { $gte: Date.now() },
          },
          "expiriesAt",
          { sort: { expiriesAt: -1 } }
        );
        const payment = new Payment();
        if (lastPaymentExpiriesAt)
          lastPaymentExpiriesAt = lastPaymentExpiriesAt.expiriesAt.getTime();
        else lastPaymentExpiriesAt = Date.now();
        payment.userId = user._id;
        payment.tariff = tariff;
        payment.startedAt = lastPaymentExpiriesAt;
        payment.expiriesAt =
          lastPaymentExpiriesAt + Number(tariff.duration) * 1000 * 60 * 60 * 24;
        payment.updatedAt = Date.now();
        let params = {};
        params.userName = process.env.SB_USERNAME;
        params.password = process.env.SB_PASSWORD;
        params.clientId = String(user._id);
        //Тут параметры url для красоты
        params.returnUrl = `${process.env.API_URL}`;
        params.failUrl = `${process.env.CLIENT_URL}`;
        params.features = "AUTO_PAYMENT";
        params.orderNumber = String(payment._id);
        params.bindingId = user.bindingIdCard;
        let price =
          tariff.price -
          (!!tariff.discount ? tariff.price * tariff.discount * 0.01 : 0);
        params.amount = price * 100; // *Умножение на 100 так как стоимость указывается в копейках
        //Создание заказа
        let response = await sendRequest(orderLink, "POST", params);
        if (!response.errorCode) {
          payment.orderId = response.orderId;
          await payment.save();
          params = {};
          params.userName = process.env.SB_USERNAME;
          params.password = process.env.SB_PASSWORD;
          params.mdOrder = payment.orderId;
          params.bindingId = user.bindingIdCard;
          params.ip = ip.address();
          //Запрос на оплату по автоплатежу
          response = await sendRequest(paymentOrderBinding, "POST", params);
          if (!response.errorCode) {
            payment.status = "hold";
            await payment.save();
            params = {};
            params.userName = process.env.SB_USERNAME;
            params.password = process.env.SB_PASSWORD;
            params.orderId = payment.orderId;
            params.amount = price * 100; // *Умножение на 100 так как стоимость указывается в копейках
            //Списание оплаты
            response = await sendRequest(finishLink, "POST", params);
            if (response.errorCode === "0") {
              payment.status = "success";
              payment.expiriesAt =
                Date.now() + payment.tariff.duration * 1000 * 60 * 60 * 24;
              payment.updatedAt = Date.now();
              payment.startedAt = Date.now();
              await payment.save();
              const agenda = require("../agenta/agenta");
              let job = await agenda.schedule(
                payment.expiriesAt,
                "setTarrifCancel",
                {
                  userId: payment.userId,
                }
              );
              let jobTwo = await agenda.schedule(
                new Date(payment.expiriesAt).getTime() -
                  1000 * 60 * 60 * 24 * 3,
                "setTarrifCancelNotify",
                {
                  userId: payment.userId,
                }
              );
              await User.findOneAndUpdate(
                { _id: payment.userId },
                { $set: { isTariff: true } }
              );
              setTariff({
                userId: payment.userId,
                tariff: payment.tariff,
                expiriesAt: payment.expiriesAt,
              });
              createNotify(
                payment.userId,
                { tariffName: payment.tariff.name },
                "AUTOPAYMENT_SUCCESS",
                "system"
              );
              return true;
            }
          }
        }
        createNotify(
          payment.userId,
          { tariffName: payment.tariff.name },
          "AUTOPAYMENT_ERROR",
          "system"
        );
        return false;
      }
    } catch (e) {
      return false;
    }
  },
  removeCard: async (req, res, next) => {
    let { user } = res.locals;
    let { bindingId } = req.body;
    try {
      let params = {};
      params.userName = process.env.SB_USERNAME;
      params.password = process.env.SB_PASSWORD;
      params.bindingId = bindingId;
      let response = await sendRequest(unBindCard, "GET", params);

      if (response.errorCode === "0") {
        await User.findOneAndUpdate(
          {
            _id: user._id,
            bindingIdCard: bindingId,
          },
          { $set: { bindingIdCard: false } }
        );
        return res.json({ error: false });
      } else return res.json({ error: true });
    } catch (e) {
      return next(new Error(e));
    }
  },
  bindCard: async (req, res, next) => {
    const { bindingId } = req.body;
    let { user } = res.locals;
    try {
      user.bindingIdCard = bindingId;
      await user.save();
      return res.json({ error: false });
    } catch (e) {
      return next(new Error(e));
    }
  },
  buy: async (req, res, next) => {
    const { user } = res.locals;
    const { tariffId, from } = req.body;

    try {
      if (user.type === "carrier") {
        let lastPaymentExpiriesAt = await Payment.findOne(
          {
            userId: user._id,
            status: "success",
            expiriesAt: { $gte: Date.now() },
          },
          "expiriesAt",
          { sort: { expiriesAt: -1 } }
        );

        const payment = new Payment();

        let tariff = await Tariff.findOne({ _id: tariffId, isEnable: true });

        if (lastPaymentExpiriesAt)
          lastPaymentExpiriesAt = lastPaymentExpiriesAt.expiriesAt.getTime();
        else lastPaymentExpiriesAt = Date.now();
        if (tariff) {
          if (tariff.isDemo) {
            const err = {};
            err.param = `all`;
            err.msg = `already_use_demo`;
            return res.status(401).json({ error: true, errors: [err] });
          } else {
            payment.userId = user._id;
            payment.tariff = tariff;
            payment.startedAt = lastPaymentExpiriesAt;
            payment.expiriesAt =
              lastPaymentExpiriesAt +
              Number(tariff.duration) * 1000 * 60 * 60 * 24;
            payment.updatedAt = Date.now();
            let params = {};
            params.userName = process.env.SB_USERNAME;
            params.password = process.env.SB_PASSWORD;
            params.orderNumber = payment._id;
            params.clientId = user._id;
            let price =
              tariff.price -
              (!!tariff.discount ? tariff.price * tariff.discount * 0.01 : 0);
            params.amount = price * 100; // *Умножение на 100 так как стоимость указывается в копейках
            params.returnUrl = `${process.env.API_URL}/api/tariffs/check-order`;

            params.failUrl = `${process.env.CLIENT_URL}`;

            let response = await sendRequest(orderLink, "GET", params);

            if (response.orderId) {
              payment.orderId = response.orderId;
            }

            await payment.save();

            return res.json({ response });
          }
        }
      }
      const err = {};
      err.param = `all`;
      err.msg = `not_found`;
      return res.status(404).json({ error: true, errors: [err] });
    } catch (e) {
      return next(new Error(e));
    }
  },
  check: async (req, res, next) => {
    const { orderId, from } = req.query;
    try {
      let payment = await Payment.findOne({ orderId }).populate("tariff");

      let params = {};
      params.userName = process.env.SB_USERNAME;
      params.password = process.env.SB_PASSWORD;
      params.orderId = orderId;

      let response = await sendRequest(statusLink, "GET", params);

      if (response.OrderStatus === 1 && payment.status === "wait") {
        payment.status = "hold";
        payment.updateAt = Date.now();
        await payment.save();
        let price =
          payment.tariff.price -
          (!!payment.tariff.discount
            ? payment.tariff.price * payment.tariff.discount * 0.01
            : 0);
        params.amount = price * 100; // *Умножение на 100 так как стоимость указывается в копейках

        let response = await sendRequest(finishLink, "GET", params);

        if (response.errorCode === "0") {
          payment.status = "success";
          payment.expiriesAt =
            Date.now() + payment.tariff.duration * 1000 * 60 * 60 * 24;
          payment.updatedAt = Date.now();
          payment.startedAt = Date.now();
          await payment.save();
          const agenda = require("../agenta/agenta");
          let job = await agenda.schedule(
            payment.expiriesAt,
            "setTarrifCancel",
            {
              userId: payment.userId,
            }
          );
          let jobTwo = await agenda.schedule(
            new Date(payment.expiriesAt).getTime() - 1000 * 60 * 60 * 24 * 3,
            "setTarrifCancelNotify",
            {
              userId: payment.userId,
            }
          );
          await User.findOneAndUpdate(
            { _id: payment.userId },
            { $set: { isTariff: true } }
          );
          setTariff({
            userId: payment.userId,
            tariff: payment.tariff,
            expiriesAt: payment.expiriesAt,
          });
          createNotify(
            payment.userId,
            {
              tariffName: payment.tariff.name,
              dateCancel: new Date(payment.expiriesAt).toString("dd.MM.yyyy"),
            },
            "TARIFFF_ACTIVATED",
            "system"
          );
          res.writeHead(301, {
            Location: `${
              process.env.CLIENT_URL
            }/mytarif/?paySuccess=true&uuid=${randomInteger(0, 1000000)}`,
          });
        } else {
          res.writeHead(301, {
            Location: `${
              process.env.CLIENT_URL
            }/mytarif/?paySuccess=false&uuid=${randomInteger(0, 1000000)}`,
          });
        }
      } else {
        res.writeHead(301, {
          Location: `${
            process.env.CLIENT_URL
          }/mytarif/?paySuccess=false&uuid=${randomInteger(0, 1000000)}`,
        });
      }

      return res.end();
    } catch (error) {
      return next(new Error(error));
    }
  },
  setDemoTariff: async function(userId) {
    let demoTariff = await Tariff.findOne({ isDemo: true });
    const payment = new Payment();
    payment.userId = userId;
    payment.tariff = demoTariff;
    payment.status = "success";
    payment.startedAt = new Date();
    payment.expiriesAt =
      Date.now() + Number(demoTariff.duration) * 1000 * 60 * 60 * 24;
    payment.updatedAt = Date.now();
    await payment.save();
    const agenda = require("../agenta/agenta");
    let job = await agenda.schedule(payment.expiriesAt, "setTarrifCancel", {
      userId,
    });
    let jobTwo = await agenda.schedule(
      new Date(payment.expiriesAt).getTime() - 1000 * 60 * 60 * 24 * 3,
      "setTarrifCancelNotify",
      {
        userId: payment.userId,
      }
    );
  },
  addNewCard: async (req, res, next) => {
    const { user } = res.locals;
    let params = {};
    params.userName = process.env.SB_USERNAME;
    params.password = process.env.SB_PASSWORD;
    params.clientId = user._id;
    params.orderNumber = randomInteger(0, 1000000);
    params.amount = 1; // *Умножение на 100 так как стоимость указывается в копейках
    params.returnUrl = `${process.env.API_URL}/api/tariffs/checkCard`;
    params.failUrl = `${process.env.CLIENT_URL}`;
    let response = await sendRequest(orderLink, "GET", params);

    return res.json({ response });
  },
  checkCard: async (req, res, next) => {
    const { orderId } = req.query;
    try {
      let params = {};
      params.userName = process.env.SB_USERNAME;
      params.password = process.env.SB_PASSWORD;
      params.orderId = orderId;
      params.amount = 1;
      let response = await sendRequest(statusLinkAuto, "GET", params);
      if (response.orderStatus === 1) {
        await User.findByIdAndUpdate(response.bindingInfo.clientId, {
          $set: { bindingIdCard: response.bindingInfo.bindingId },
        });
        response = await sendRequest(reverseDo, "GET", params);
        res.writeHead(301, {
          Location: `${
            process.env.CLIENT_URL
          }/autopay?paySuccess=success&uuid=${randomInteger(0, 1000000)}`,
        });
      } else {
        res.writeHead(301, {
          Location: `${
            process.env.CLIENT_URL
          }/autopay?paySuccess=false&uuid=${randomInteger(0, 1000000)}`,
        });
      }

      return res.end();
    } catch (error) {
      return next(new Error(error));
    }
  },
};
function sendRequest(url, method, params) {
  return new Promise((resolve) => {
    let link = url + "?";

    for (let i in params) {
      if (params.hasOwnProperty(i)) link += i + "=" + params[i] + "&";
    }

    if (params) link = link.substr(0, link.length - 1);
    if (method === "POST")
      request.post(link, function(err, res, body) {
        resolve(JSON.parse(body.toString()));
      });
    else
      request(link, function(err, res, body) {
        resolve(JSON.parse(body.toString()));
      });
  });
}
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
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

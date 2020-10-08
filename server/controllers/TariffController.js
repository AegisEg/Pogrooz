const Tariff = require("../models/Tariff");
const Payment = require("../models/Payment");
const { setTariff } = require("../controllers/SocketController");
const User = require("../models/User");
const request = require("request");
const orderLink = "https://3dsec.sberbank.ru/payment/rest/registerPreAuth.do";
const statusLink = "https://3dsec.sberbank.ru/payment/rest/getOrderStatus.do";
const finishLink = "https://3dsec.sberbank.ru/payment/rest/deposit.do";

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
      user = User.findById(user._id).select("sberBankClientId");
      if (user.sberBankClientId) {
      } else return res.json({ cards: [] });
    } catch (e) {
      console.log(e);
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
          tariff.price -
          (!!tariff.discount ? tariff.price * tariff.discount * 0.01 : 0);
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
          await User.findOneAndUpdate(
            { _id: payment.userId },
            { $set: { isTariff: true } }
          );
          setTariff({
            userId: payment.userId,
            tariff: payment.tariff,
            expiriesAt: payment.expiriesAt,
          });
          res.writeHead(301, {
            Location: `${
              process.env.CLIENT_URL
            }/?paySuccess=true&uuid=${randomInteger(0, 1000000)}`,
          });
        } else {
          res.writeHead(301, {
            Location: `${
              process.env.CLIENT_URL
            }/?paySuccess=false&uuid=${randomInteger(0, 1000000)}`,
          });
        }
      } else {
        res.writeHead(301, {
          Location: `${
            process.env.CLIENT_URL
          }/?paySuccess=false&uuid=${randomInteger(0, 1000000)}`,
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
  },
  addNewCard: async (req, res, next) => {
    const { user } = res.locals;
    let payment = new Payment();
    payment.userId = user._id;
    payment.updatedAt = Date.now();
    let params = {};
    params.userName = process.env.SB_USERNAME;
    params.password = process.env.SB_PASSWORD;
    params.orderNumber = payment._id;
    params.amount = 1; // *Умножение на 100 так как стоимость указывается в копейках
    params.returnUrl = `${process.env.API_URL}/api/tariffs/checkCard`;
    params.failUrl = `${process.env.CLIENT_URL}`;
    let response = await sendRequest(orderLink, "GET", params);
    if (response.orderId) {
      payment.orderId = response.orderId;
    }
    await payment.save();
    return res.json({ response });
  },
  checkCard: async (req, res, next) => {},
};
function sendRequest(url, method, params) {
  return new Promise((resolve) => {
    let link = url + "?";

    for (let i in params) {
      if (params.hasOwnProperty(i)) link += i + "=" + params[i] + "&";
    }

    if (params) link = link.substr(0, link.length - 1);

    request(link, function(err, res, body) {
      resolve(JSON.parse(body.toString()));
    });
  });
}
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

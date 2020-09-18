const Tariff = require("../models/Tariff");
const Payment = require("../models/Payment");
const { setTariff } = require("../controllers/SocketController");
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
  buy: async (req, res, next) => {
    const { user } = res.locals;
    const { tariffId } = req.body;

    try {
      let lastPaymentExpiriesAt = await Payment.findOne(
        {
          userId: user._id,
          status: "success",
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
          payment.status = "success";
          payment.expiriesAt =
            lastPaymentExpiriesAt +
            Number(tariff.duration) * 1000 * 60 * 60 * 24;
          console.log(payment.expiriesAt);
          payment.updatedAt = Date.now();
          await payment.save();

          // let params = {};

          // params.userName = process.env.SB_USERNAME;
          // params.password = process.env.SB_PASSWORD;

          // params.orderNumber = payment._id;
          // params.amount = tariff.price * 100; // *Умножение на 100 так как стоимость указывается в копейках

          // if (from === "app") {
          //   params.returnUrl = `${
          //     process.env.API_URL
          //   }/api/payment/check-order?from=app`;
          // } else {
          //   params.returnUrl = `${process.env.API_URL}/api/payment/check-order`;
          // }

          // params.failUrl = `${process.env.CLIENT_URL}`;

          // let response = await sendRequest(orderLink, "GET", params);

          // if (response.orderId) {
          //   payment.orderId = response.orderId;
          // }

          // if (response.formUrl) {
          //   payment.formUrl = response.formUrl;
          // }
          setTariff({
            userId: user._id,
            tariff,
            expiriesAt: payment.expiriesAt,
          });

          return res.json({});
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
};

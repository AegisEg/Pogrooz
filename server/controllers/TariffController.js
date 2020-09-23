const Tariff = require("../models/Tariff");
const Payment = require("../models/Payment");
const { setTariff } = require("../controllers/SocketController");
const User = require("../models/User");
const agenda = require("../agenta/agenta");
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
            payment.status = "success";
            payment.startedAt = lastPaymentExpiriesAt;
            payment.expiriesAt =
              lastPaymentExpiriesAt + Number(tariff.duration) * 1000 * 2;
            //60 * 60 * 24
            payment.updatedAt = Date.now();
            await payment.save();
            let job = await agenda.schedule(
              payment.expiriesAt,
              "setTarrifCancel",
              {
                userId: user._id,
              }
            );
            await User.findOneAndUpdate(
              { _id: user._id },
              { $set: { isTariff: true } }
            );
            // , tariffJob: job.attrs._id
            setTariff({
              userId: user._id,
              tariff,
              expiriesAt: payment.expiriesAt,
            });

            return res.json({});
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
  setDemoTariff: async function(userId) {
    let demoTariff = await Tariff.findOne({ isDemo: true });
    const payment = new Payment();
    payment.userId = userId;
    payment.tariff = demoTariff;
    payment.status = "success";
    payment.startedAt = new Date();
    payment.expiriesAt = Date.now() + Number(demoTariff.duration) * 1000 * 2;
    //60 * 60 * 24
    payment.updatedAt = Date.now();
    await payment.save();
    const agenda = require("../agenta/agenta");
    let job = await agenda.schedule(payment.expiriesAt, "setTarrifCancel", {
      userId,
    });
  },
};

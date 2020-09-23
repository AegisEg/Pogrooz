/**
 * verifyToken.js
 * Author: Vasilev Egor
 */
"use strict";

const Payment = require("../models/Payment");
module.exports = async (req, res, next) => {
  if (res.locals.user.type === "carrier") {
    let currentPaymentTariff = await Payment.findOne(
      {
        userId: res.locals.user._id,
        status: "success",
        expiriesAt: { $gte: new Date() },
      },
      ["tariff"],
      { sort: { expiriesAt: 1 } }
    ).populate("tariff");
    if (!currentPaymentTariff) {
      return res.status(422).json({
        error: true,
        errors: [
          {
            param: "notTarif",
            msg: "Тариф не активен",
          },
        ],
      });
    }
  }
  if (res.locals.user.isBan) {
    return res.status(422).json({
      error: true,
      errors: [
        {
          param: "Banned",
          msg: "Действие заблокировано",
        },
      ],
    });
  }
  return next();
};

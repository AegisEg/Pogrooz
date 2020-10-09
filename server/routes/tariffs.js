/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const TariffController = require("../controllers/TariffController");
const BanCheck = require("../middleware/BanCheck");
router.post("/", TariffController.getTariffs);
router.post("/buy", verifyToken, BanCheck, TariffController.buy);
router.get("/check-order", TariffController.check);
router.post("/payments", verifyToken, TariffController.payments);
//AutoPay
router.post(
  "/getMyAutoPayments",
  verifyToken,
  TariffController.getMyAutoPayments
);
router.post("/addNewCard", verifyToken, BanCheck, TariffController.addNewCard);
router.post("/bindCard", verifyToken, TariffController.bindCard);
router.post("/autoPayment", verifyToken, TariffController.autoPayment);
router.post("/removeCard", verifyToken, TariffController.removeCard);
router.get("/checkCard", TariffController.checkCard);

module.exports = router;

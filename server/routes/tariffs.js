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
router.post("/payments", verifyToken, TariffController.payments);
module.exports = router;

/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const StatsController = require("../controllers/StatsController");
router.post("/get-users", StatsController.getUsers);
router.post("/get-registers", StatsController.getRegister);
router.post("/get-articles", StatsController.getArticles);
router.post("/get-tariffs", StatsController.getTariffs);
router.post("/get-articlesCreated", StatsController.getCreatedArticles);
router.post("/get-exel", StatsController.getExelUser);

module.exports = router;

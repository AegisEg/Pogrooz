/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const PageController = require("../controllers/PageController");
router.post("/", PageController.page);
router.post("/questions", PageController.questions);
router.post("/question", PageController.question);
module.exports = router;

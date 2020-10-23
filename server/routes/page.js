/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const PageController = require("../controllers/PageController");
const MailController = require("../controllers/MailController");
router.post("/", PageController.page);
router.post("/questions", PageController.questions);
router.post("/question", PageController.question);
router.post("/getSettings", PageController.getSettings);
router.post("/sendMailCall", MailController.sendMailCall);

module.exports = router;

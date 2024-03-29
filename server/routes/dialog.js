/**
 * dialog.js
 * Author: Roman Shuvalov
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const DialogController = require("../controllers/DialogController");

router.post("/get-all", verifyToken, DialogController.getAll);
router.post("/get", verifyToken, DialogController.get);
router.post("/send-message", verifyToken, DialogController.sendMessage);
router.post("/read-messages", verifyToken, DialogController.readMessages);
router.post("/load-messages", verifyToken, DialogController.loadMessage);
router.post("/load", verifyToken, DialogController.load);
router.post("/load-file", verifyToken, DialogController.loadFile);

module.exports = router;

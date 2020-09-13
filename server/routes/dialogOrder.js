/**
 * dialog.js
 * Author: Roman Shuvalov
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const DialogController = require("../controllers/DialogOrderController");

router.post("/get-all", verifyToken, DialogController.getAll);
router.post("/get", verifyToken, DialogController.get);
router.post("/getAllDialog", verifyToken, DialogController.getAllDialog);
module.exports = router;

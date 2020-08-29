/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const NotificationController = require("../controllers/NotificationController");
// Get the user for this user
router.post("/get-all", verifyToken, NotificationController.getAll);
router.post("/read", verifyToken, NotificationController.read);
module.exports = router;

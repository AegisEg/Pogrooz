/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const adminVerifi = require("../middleware/adminVerifi");
const UserController = require("../controllers/UserController");
const { check } = require("express-validator");
// Get the user for this user
router.get("/", verifyToken, UserController.user);
router.post("/get", UserController.get);
router.post("/get-online", verifyToken, UserController.getOnline);
router.post("/user-edit", verifyToken, UserController.profileEdit);
router.post("/password-change", verifyToken, UserController.passChange);
router.post("/save-settings", verifyToken, UserController.notificationSettings);
router.post("/toogleAutoPay", verifyToken, UserController.toogleAutoPay);
router.post("/getSettings", verifyToken, UserController.getSettings);
router.post("/userBan", adminVerifi, UserController.userBan);
router.post("/modarationFail", adminVerifi, UserController.modarationFail);
router.post("/sendNotify", adminVerifi, UserController.sendNotify);
module.exports = router;

/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const UserController = require("../controllers/UserController");
const { check } = require("express-validator");
// Get the user for this user
router.get("/", verifyToken, UserController.user);
router.post("/get", UserController.get);
router.post("/get-online", verifyToken, UserController.getOnline);
router.post("/user-edit", verifyToken, UserController.profileEdit);
router.post("/password-change", verifyToken, UserController.passChange);

module.exports = router;

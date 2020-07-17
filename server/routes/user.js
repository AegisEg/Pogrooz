/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const UserController = require("../controllers/UserController");

// Get the user for this user
router.get("/", verifyToken, UserController.user);
router.post("/get-online", verifyToken, UserController.getOnline);

module.exports = router;

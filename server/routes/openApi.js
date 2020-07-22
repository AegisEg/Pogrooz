/**
 * user.js
 * Author: Vasilev Egor
 */
"use strict";

const router = require("express").Router();
const openApiController = require("../controllers/OpenApiController");
router.post("/carTypes", openApiController.carTypesList);

module.exports = router;

"use strict";

const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const CarController = require("../controllers/CarController");

router.post("/createCarTemplate", verifyToken, CarController.createCarTemplate);
router.post("/updateCarTemplate", verifyToken, CarController.updateCarTemplate);
router.post("/deleteCarTemplate", verifyToken, CarController.deleteCarTemplate);
router.post("/getCarTemplates", verifyToken, CarController.getCarTemplates);
router.post("/getCarTemplate", verifyToken, CarController.getCarTemplate);
router.post("/getLikeCars", verifyToken, CarController.getLikeCars);
module.exports = router;

/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";
const carType = require("../models/Car/CarType");

module.exports = {
  carTypesList: async (req, res, next) => {
    try {
      let data = false;
      if (!req.body.proOnly) data = await carType.find({});
      else data = await carType.find({ isPro: true });
      return res.json(data);
    } catch (e) {
      return next(new Error(e));
    }
  },
};

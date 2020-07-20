/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
//Типы машин
const CarTypeSchema = new Schema({
  name: { type: String },
  buff: Buffer,
});

const CarType = mongoose.model("CarType", CarTypeSchema);

module.exports = CarType;

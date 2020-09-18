/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
const TariffSchema = new Schema({
  name: { type: String, default: "" },
  duration: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  isEnable: { type: Boolean, default: false },
  isDemo: { type: Boolean, default: false },
  buff: Buffer,
});

const Tariff = mongoose.model("Tariff", TariffSchema);

module.exports = Tariff;

/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../../database");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  name: { type: String, required: true, text: true },
  buff: Buffer,
});
const Car = mongoose.model("Car", CarSchema);

module.exports = Car;

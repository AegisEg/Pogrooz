/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../../database");
const CarSchema = require("./CarSchema");
const Schema = mongoose.Schema;

const CarTemplateSchema = new Schema({
  car: CarSchema,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});
const CarTemplate = mongoose.model("CarTemplate", CarTemplateSchema);

module.exports = CarTemplate;

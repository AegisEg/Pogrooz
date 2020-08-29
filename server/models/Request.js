/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
const RequestSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String },
  date: { type: Date },
  budget: { type: Number },
  timeFrom: { type: Date },
  timeTo: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;

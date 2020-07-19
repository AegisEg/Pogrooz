/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;

// The number of rounds to use when hashing a password with bcrypt

const ArticleSchema = new Schema({
  autorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: { type: String, enum: ["offer", "order"], select: true },
  cargoTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "CargoType" }],
  paramOnePlace: {
    weight: Number,
    weightUnit: Number,
    length: Number,
    width: Number,
    height: Number,
  },
  cargoPhoto: [{ type: Object }],
  from: {
    coords: String,
    description: String,
  },
  to: {
    coords: String,
    description: String,
  },
  startDate: { type: Date, default: Date.now },
  additionally: { type: Object },
  additionally: { type: Object },
  contractInfo: { type: Object },
  paymentInfo: { type: Object },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

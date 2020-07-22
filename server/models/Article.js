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
  cargoPhoto: [{ type: Object }],
  car: {
    type: { type: mongoose.Schema.Types.ObjectId, ref: "CarType" },
    name: { type: String },
    photo: { type: Object },
    additionally: { type: Object },
    contractInfo: { type: Object },
    paymentInfo: { type: Object },
  },
  carTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "CarTemplate" },
  comment: { type: String },
  budget: { type: Number },
  paramOnePlace: {
    weight: Number,
    weightUnit: Number,
    length: Number,
    width: Number,
    height: Number,
  },
  from: {
    coords: String,
    description: String,
  },
  to: {
    coords: String,
    description: String,
  },
  startDate: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

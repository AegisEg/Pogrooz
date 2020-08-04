/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose);

const ArticleSchema = new Schema({
  numberID: { type: Number, default: 0 },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["offer", "order"], select: true },
  cargoTypes: [{ type: Number }],
  cargoData: [{ type: Object }],
  cargoStandartData: { type: Object },
  cargoPhoto: [{ type: Object }],
  status: { type: Number },
  car: {
    typesCar: [{ type: Number }],
    name: { type: String },
    photo: { type: Object },
    info: { type: Object },
    additionally: [{ type: Object }],
    contractInfo: [{ type: Object }],
    paymentInfo: [{ type: Object }],
  },
  carTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "CarTemplate" },
  comment: { type: String },
  budget: { type: Number },
  from: { type: Object },
  to: { type: Object },
  startDate: {
    date: Date,
    timeFrom: Date,
    timeTo: Date,
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

ArticleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "articleId",
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

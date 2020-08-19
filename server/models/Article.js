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
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, enum: ["offer", "order"], select: true },
  cargoTypes: [{ type: Number }],
  cargoData: [{ type: Object }],
  cargoStandartData: { type: Object },
  cargoPhoto: [{ type: Object }],
  status: { type: Number },
  car: {
    typesCar: [{ type: Number }],
    name: { type: String },
    property: { type: String },
    photo: { type: Object },
    info: { type: Object },
    additionally: [{ type: Object }],
    contractInfo: [{ type: Object }],
    paymentInfo: [{ type: Object }],
  },
  executors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  carTemplate: { type: mongoose.Schema.Types.ObjectId, ref: "CarTemplate" },
  comment: { type: String },
  budget: { type: Number },
  from: { type: Object },
  fromLocation: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  to: { type: Object },
  toLocation: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
  },
  startDate: {
    date: Date,
    timeFrom: Date,
    timeTo: Date,
  },
  requests: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      startDate: {
        date: Date,
        timeFrom: Date,
        timeTo: Date,
      },
      budget: { type: Number },
      comment: { type: String },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});
ArticleSchema.index({ fromLocation: "2dsphere" });
ArticleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "articleId",
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

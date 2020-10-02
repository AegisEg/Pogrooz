/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
const CarSchema = require("./Car/CarSchema");
autoIncrement.initialize(mongoose);

const ArticleSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Request", default: [] },
  ],
  type: { type: String, enum: ["offer", "order"] },
  cargoTypes: [{ type: Number }],
  cargoData: [{ type: Object }],
  cargoStandartData: { type: Object },
  cargoPhoto: [{ type: Object }],
  status: { type: Number },
  car: CarSchema,
  lastCarrierLocation: {
    type: { type: String, default: "Point" },
    coordinates: [Number],
    date: Date,
  },
  executors: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  delivered: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
  ],
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Review", default: [] },
  ],
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
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  jobId: { type: mongoose.Schema.Types.ObjectId },
  buff: Buffer,
});
ArticleSchema.index({ fromLocation: "2dsphere" });
ArticleSchema.index({ toLocation: "2dsphere" });
ArticleSchema.plugin(autoIncrement.plugin, {
  model: "Article",
  field: "articleId",
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

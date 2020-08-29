/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, default: 0 },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;

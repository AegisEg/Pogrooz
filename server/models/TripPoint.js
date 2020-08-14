/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;

// The number of rounds to use when hashing a password with bcrypt

const TripPointSchema = new Schema({
  location: { type: { type: String, default: "Point" }, coordinates: [Number] },
  acticle: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  type: { type: String },
  buff: Buffer,
});

const TripPoint = mongoose.model("TripPoint", TripPointSchema);

module.exports = TripPoint;

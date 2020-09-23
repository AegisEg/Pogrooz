/**
 * Room.js
 * Author: Roman Shuvalov
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;

// The number of rounds to use when hashing a password with bcrypt

const BanSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  expiriesAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Ban = mongoose.model("Ban", BanSchema);

module.exports = Ban;

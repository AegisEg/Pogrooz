/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../../database");
const Schema = mongoose.Schema;

// The number of rounds to use when hashing a password with bcrypt

const CargoTypeSchema = new Schema({
  autorId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  name: { type: String },
  buff: Buffer,
});

const CargoType = mongoose.model("CargoType", CargoTypeSchema);

module.exports = CargoType;

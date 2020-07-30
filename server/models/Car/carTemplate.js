/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../../database");
const Schema = mongoose.Schema;
//Типы машин
const CarTypeSchema = new Schema({
  type: { type: mongoose.Schema.Types.ObjectId, ref: "CarType" },
  name: { type: String },
  additionally: { type: Object },
  contractInfo: { type: Object },
  paymentInfo: { type: Object },

  buff: Buffer,
});

const CarType = mongoose.model("CarType", CarTypeSchema);

module.exports = CarType;

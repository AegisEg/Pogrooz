/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../../database");
const Schema = mongoose.Schema;

//Модели машин

const CarModelSchema = new Schema({
  name: { type: String },
  parrent: { type: mongoose.Schema.Types.ObjectId, ref: "CarModel" },
  buff: Buffer,
});

const CarModel = mongoose.model("CarModel", CarModelSchema);

module.exports = CarModel;

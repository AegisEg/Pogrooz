/**
 * Dialog.js
 * Author: Vasilev Egor
 */
"use strict";

const mongoose = require("../database");
const Schema = mongoose.Schema;

// The number of rounds to use when hashing a password with bcrypt

const DialogSchema = new Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: { type: Array, default: [] },
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  noRead: { type: Number, default: 0 },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    default: null,
  },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  buff: Buffer,
});

const Dialog = mongoose.model("Dialog", DialogSchema);

module.exports = Dialog;

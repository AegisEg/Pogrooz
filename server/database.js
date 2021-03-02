"use strict";

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/pogrooz", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0,
    },
  },
});

module.exports = mongoose;

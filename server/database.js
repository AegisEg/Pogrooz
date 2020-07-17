'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pogrooz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;

/**
 * RoomController.js
 * Author: Roman Shuvalov
 */
"use strict";

const Article = require("../models/Article");
const User = require("../models/User");

// const {} = require("./SocketController");

module.exports = {
  createArticle: async (req, res, next) => {
    const { user } = res.locals;
    try {
      
    //   return res.json();
    } catch (e) {
      return next(new Error(e));
    }
  },
  
};
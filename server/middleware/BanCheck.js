/**
 * verifyToken.js
 * Author: Vasilev Egor
 */
"use strict";

module.exports = async (req, res, next) => {
  if (res.locals.user.isBan) {
    return res.status(422).json({
      error: true,
      errors: [
        {
          param: "Banned",
          msg: "Действие заблокировано",
        },
      ],
    });
  }
  return next();
};

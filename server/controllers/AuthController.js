/**
 * AuthController.js
 * Author: Roman Shuvalov
 */
"use strict";

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = {
  // Register method
  register: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: User's email
    //  - firstName: User's firstName
    //  - middleName: User's middleName
    //  - lastName: User's lastName
    //  - phone: User's phone
    //  - password: User's password
    //  - type: User's type (cargo or carrier)
    const user = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }

    try {
      // Make sure there isn't an existing user in our database
      const existingUserEmail = await User.getByEmail(user.email);
      const existingUserPhone = await User.getByPhone(user.phone);

      if (existingUserEmail || existingUserPhone) {
        // Conflict: the resource already exists (HTTP 409)
        const err = {};
        err.param = `all`;
        err.msg = `That email or phone is already taken.`;
        return res.status(409).json({ error: true, errors: [err] });
      }

      const newUser = await User.create(user);

      let token = generateToken(newUser.id);

      return res.json({ token, user: newUser.getJSON() });
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
  // Login method
  login: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    //  - password: username's password
    const { phone, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }

    try {
      // Get the user for this email address
      const user = await User.getByPhone(phone);
      if (user) {
        const verifiedPassword = await user.comparePassword(password);

        if (verifiedPassword) {
          // Success: generate and respond with the JWT
          let token = generateToken(user.id);

          return res.json({ token, user: user.toJSON() });
        }
      }
    } catch (e) {
      return next(new Error(e));
    }
    // Unauthorized (HTTP 401)
    const err = {};
    err.param = `all`;
    err.msg = `Username and password don't match.`;
    return res.status(401).json({ error: true, errors: [err] });
  },
  forgot: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    const { email } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }
    try {
      // Make sure there is an existing user in our database
      const existingUserEmail = await User.getByEmail(email);
      if (existingUserEmail) {
        if (existingUserEmail.resetPasswordExpires > Date.now()) {
          let ResetToken = User.generatePasswordReset(email);
          //Отправка на почту письма
          return res.json({
            status: "sended",
            email: email,
          });
        }
        //Уже отправлено
        else
          return res.json({
            status: "waiting",
            email: email,
            time: existingUserEmail.user.resetPasswordExpires - Date.now(),
          });
      } else {
        // Conflict: the resource already exists (HTTP 409)
        const err = {};
        err.param = `email`;
        err.msg = `Пользователь с данной почтой не найден`;
        return res.status(409).json({ error: true, errors: [err] });
      }
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
  reset: async (req, res, next) => {
    // This route expects the body parameters:
    //  - email: username's email
    const { password, token } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: true, errors: errors.array() });
    }
    try {
      // Make sure there is an existing user in our database
      const existingUserEmail = await User.getByResetPasswordToken(token);
      if (existingUserEmail) {
        existingUserEmail.user.updatePassword(password);
        // Сообщение о сбросе пароля
        return res.json({
          status: "success"
        });
      } else {
        // Conflict: the resource already exists (HTTP 409)
        const err = {};
        err.param = `token`;
        err.msg = `Неверный токен`;
        return res.status(409).json({ error: true, errors: [err] });
      }
    } catch (e) {
      console.log(e);
      return next(new Error(e));
    }
  },
};

// Generates a signed JWT that encodes a user ID
// This function requires:
//  - userId: user to include in the token
function generateToken(userId) {
  // Include some data and an expiration timestamp in the JWT
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // This key expires in 1 hour
      data: { userId },
    },
    process.env.JWT_SECRET
  );
}

/**
 * AuthController.js
 * Author: Roman Shuvalov
 */
'use strict';

const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
            return res.status(422).json({error: true, errors: errors.array()});
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
                return res.status(409).json({error: true, errors: [err]});
            }
        
            const newUser = await User.create(user);
            
            let token = generateToken(newUser.id)

            return res.json({token, user: newUser.getJSON()});
        } catch (e) {
            console.log(e)
            return next(new Error(e));
        }
    },
    // Login method
    login: async (req, res, next) => {
        // This route expects the body parameters:
        //  - email: username's email
        //  - password: username's password
        const {email, password} = req.body;
      
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({error: true, errors: errors.array()});
        }
      
        try {
            // Get the user for this email address
            const user = await User.getByEmail(email);
            if (user) {
                const verifiedPassword = await user.comparePassword(password);
        
                if (verifiedPassword) {
                    // Success: generate and respond with the JWT
                    let user = {
                        id: user.id,
                        email: user.email,
                    }
            
                    let token = generateToken(user.id)
                    return res.json({token, user: user.toJSON()});
                }
            }
        } catch (e) {
            return next(new Error(e));
        }
        // Unauthorized (HTTP 401)
        const err = {};
        err.param = `all`;
        err.msg = `Username and password don't match.`;
        return res.status(401).json({error: true, errors: [err]});
    }
}

// Generates a signed JWT that encodes a user ID
// This function requires:
//  - userId: user to include in the token
function generateToken(userId) {
    // Include some data and an expiration timestamp in the JWT
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // This key expires in 1 hour
        data: {userId},
      },
      process.env.JWT_SECRET
    );
  }
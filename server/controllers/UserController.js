/**
 * UserController.js
 * Author: Roman Shuvalov
 */
'use strict';

const User = require('../models/User');

module.exports = {
    // Get user data
    user: async (req, res, next) => {
        const { userId } = res.locals;
        try {
            // Get this account as JSON
            const user = await User.getById(userId);
            if (user) {
                const json = await user.toJSON();
                return res.send(json);
            }
            const err = new Error(`User ${userId} not found.`);
            err.notFound = true;
            return next(err);
        } catch (e) {
            return next(new Error(e));
        }
    },
}
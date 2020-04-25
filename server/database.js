/**
 * database.js
 * Author: Roman Shuvalov
 */
'use strict';

// Default knex parameters for a local development database defined in our config
let db = {
    client: 'mysql',
    connection: {
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DATABASE
    },
    useNullAsDefault: true,
};

module.exports = require('knex')(db);
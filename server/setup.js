/**
 * setup.js
 * Author: Roman Shuvalov
 */
'use strict';

const envFound = require('dotenv').config();
if (!envFound) {
  console.log(
    '⚠️  No .env file for HYPER10N found: this file contains' +
    'your Stripe API key and other secrets.\nTry copying .env.example to .env' +
    '(and make sure to include your own keys!)'
  );
  process.exit(0);
}

const path = require('path');
const fs = require('fs');

// Make sure Node.js packages are installed
let exists;
try {
  exists = fs.accessSync(path.join(process.cwd(), 'node_modules'));
} catch (e) {
  console.log(
    '⚠️  Missing Node.js packages. Run `npm install` before running setup.'
  );
  process.exit(0);
}

// Make sure .env file exists
try {
  const exists = fs.accessSync(path.join(process.cwd(), '.env'));
} catch (e) {
  console.log(
    '⚠️  Missing `.env` file. Copy `.env.example` and include your Stripe credentials.'
  );
  process.exit(0);
}

const knex = require('./database');
const {exec} = require('child_process');

module.exports = {
  running: false,
  async checkTables() {
    for (let table of ['users']) {
      const hasTable = await knex.schema.hasTable(table);
      if (!hasTable) {
        return false;
      }
    }
    return true;
  },
  async run() {
    if (this.running) {
      console.log('⚠️  Setup already in progress.');
      return;
    }

    this.running = true;
    try {
      // Build our Vue frontend with Rollup
      await rollup();
      // Recreate our database tables
      await dropTables();
      await createTables();
      console.log('HYPER10N is ready: run `npm start` to start the server.');
    } catch (e) {
      console.log(e);
    }
    this.running = false;
    process.exit(0);
  },
};

// Runs when this file is called directly from the command line (i.e.
// it's the main module)
if (require.main === module) {
  module.exports.run();
}

// Use Rollup to bundle our frontend Vue components into a single JS file
async function rollup() {
  console.log('🌍  Building Vue frontend');
  await exec('./node_modules/rollup/bin/rollup -c');
}

// Drop all Pogrooz tables from the database
async function dropTables() {
  console.log('🔻  Dropping existing database tables');
  await Promise.all([
    knex.schema.dropTableIfExists('users'),
  ]);
}

// Create tables on our database
async function createTables() {
  console.log('✨  Creating database tables for HYPER10N');
  await Promise.all([
    knex.schema.createTable('users', t => {
        t.increments();
        t.string('email')
            .unique()
            .notNullable();
        t.string('firstName');
        t.string('middleName');
        t.string('lastName');
        t.string('phone');
        t.string('type');
        t.string('country');
        t.string('password').notNullable();
        t.string('resetPasswordToken');
        t.string('resetPasswordExpires');
        t.string('verifiedToken');
        t.string('verifiedTokenExpires');
        t.integer('isVerified')
            .defaultTo(0);
        t.integer('createdAt');
    }),
  ]);
  console.log('✅ Database is ready');
}

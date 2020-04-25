/**
 * Model.js
 * Author: Roman Shuvalov
 */
'use strict';

const db = require('../database')

class Model {
  constructor(opts) {
    this.id = opts.id
    if (!opts) {
      throw new Error('The model requires an options object.')
    }
  }

  static async insert(object) {
      try {
          // Insert line in table
          return db(this.table).returning('id').insert(object);
      } catch (e) {
          throw new Error(e);
      }
  }

  async update(object) {
    try {
        // Update line in table
        return db(this.table).returning('id').where('id', this.id).update(object);
    } catch (e) {
        throw new Error(e);
    }
  }

  async delete() {
    try {
        // Delete line in table
        return db(this.table).where('id', this.id).del()
    } catch (e) {
        throw new Error(e);
    }
  }

  async query(query) {
    return this.knex(query);
  }

  getJSON() {
    return this.toJSON();
  }
}

module.exports = Model;

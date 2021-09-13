'use strict';

const client = require('../data/database');

class Department {
  async getAll() {
    const SQL = `SELECT * FROM departments;`;
    const { rows } = await client.query(SQL);
    return { count: rows.length, data: rows };
  }

}

module.exports = new Department();
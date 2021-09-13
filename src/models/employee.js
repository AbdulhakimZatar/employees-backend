'use strict';

const client = require('../data/database');
var faker = require('faker');

class Employee {
  async getAll(limit, offset) {
    const SQL = `SELECT * FROM employee LIMIT $1 OFFSET $2;`;
    const values = [limit, offset];
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async search(search, type, limit, offset) {
    const SQL = `SELECT * FROM employee WHERE ${type} LIKE $1 LIMIT $2 OFFSET $3;`;
    const values = [`%${search}%`, limit, offset];
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async seed(number) {
    for (let i = 0; i < number; i++) {
      const randomName = faker.name.findName(); 
      const randomEmail = faker.internet.email();
      const SQL = `INSERT INTO employee (name, email) VALUES ($1, $2);`;
      const values = [randomName, randomEmail];
      await client.query(SQL, values);
    }
  }

}

module.exports = new Employee();
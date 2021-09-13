'use strict';

const client = require('../data/database');
var faker = require('faker');

class Employee {
  async getAll(limit, offset, filter) {
    let SQL = `SELECT employees.name,employees.email,employees.id,departments.name AS department FROM employees JOIN departments ON employees.department_id=departments.id`;
    const values = [limit, offset];
    if (filter) {
      values.push(filter)
      filter = ` WHERE department_id=$3`
      SQL = SQL + filter
    };
    SQL = SQL + ` LIMIT $1 OFFSET $2;`;
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async search(search, type, limit, offset) {
    const SQL = `SELECT * FROM employees WHERE ${type} ~* $1 LIMIT $2 OFFSET $3;`;
    const values = [search, limit, offset];
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async seed(number) {
    const min = 1;
    const max = 8;
    for (let i = 0; i < number; i++) {
      const randomName = faker.name.findName();
      const randomEmail = faker.internet.email();
      const randomDepartment = Math.floor(Math.random() * (max - min + 1) + min)
      const SQL = `INSERT INTO employees (name, email,department_id) VALUES ($1,$2,$3);`;
      const values = [randomName, randomEmail, randomDepartment];
      await client.query(SQL, values);
    }
  }

}

module.exports = new Employee();
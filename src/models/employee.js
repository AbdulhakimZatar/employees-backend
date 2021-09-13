'use strict';

const client = require('../data/database');
var faker = require('faker');

class Employee {
  async getAll(limit, offset, filter) {
    let SQL = `SELECT employees.name,employees.email,employees.avatar,employees.id,departments.name AS department FROM employees JOIN departments ON employees.department_id=departments.id`;
    const values = [limit, offset];
    if (filter) {
      values.push(filter)
      filter = ` WHERE department_id=$3`
      SQL += filter
    };
    SQL += ` LIMIT $1 OFFSET $2;`;
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async search(search, type, limit, offset, filter) {
    let SQL = `SELECT employees.name,employees.email,employees.avatar,employees.id,departments.name AS department FROM employees JOIN departments ON employees.department_id=departments.id WHERE employees.${type} ~* $1`;
    const values = [search, limit, offset];
    if (filter) {
      values.push(filter)
      filter = ` AND department_id=$4`
      SQL += filter
    };
    SQL +=  ` LIMIT $2 OFFSET $3;`;
    const { rows } = await client.query(SQL, values);
    return { count: rows.length, data: rows };
  }

  async seed(number) {
    const min = 1;
    const max = 8;
    for (let i = 0; i < number; i++) {
      const randomName = faker.name.findName();
      const randomEmail = faker.internet.email();
      const randomAvatar = faker.image.avatar();
      const randomDepartment = Math.floor(Math.random() * (max - min + 1) + min)
      const SQL = `INSERT INTO employees (name, email,department_id,avatar) VALUES ($1,$2,$3,$4);`;
      const values = [randomName, randomEmail, randomDepartment,randomAvatar];
      await client.query(SQL, values);
    }
  }

}

module.exports = new Employee();
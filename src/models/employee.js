'use strict';

const client = require('../data/database');
var faker = require('faker');

class Employee {
  async getAll(limit, offset, filter) {
    let SQL = `SELECT employees.name,employees.email,employees.avatar,employees.id,departments.name AS department FROM employees JOIN departments ON employees.department_id=departments.id`;
    let SQL2 = `SELECT COUNT(*) FROM employees`
    const values = [limit, offset];
    const values2 = [];
    if (filter) {
      values.push(filter)
      values2.push(filter)

      SQL += ` WHERE department_id=$3`
      SQL2 += ` WHERE department_id=$1`
    };
    SQL += ` LIMIT $1 OFFSET $2;`;

    const { rows } = await client.query(SQL, values);
    const count = await client.query(SQL2, values2);
    return { count: Number(count.rows[0].count), data: rows };
  }

  async search(search, type, limit, offset, filter) {
    let SQL = `SELECT employees.name,employees.email,employees.avatar,employees.id,departments.name AS department FROM employees JOIN departments ON employees.department_id=departments.id WHERE employees.${type} ~* $1`;
    let SQL2 = `SELECT COUNT(*) FROM employees WHERE employees.${type} ~* $1`

    const values = [search, limit, offset];
    const values2 = [search];
    if (filter) {
      values.push(filter)
      values2.push(filter)
      SQL += ` AND department_id=$4`
      SQL2 += ` AND department_id=$2`
    };
    SQL += ` LIMIT $2 OFFSET $3;`;
    const { rows } = await client.query(SQL, values);
    const count = await client.query(SQL2, values2);
    return { count: Number(count.rows[0].count), data: rows };
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
      const values = [randomName, randomEmail, randomDepartment, randomAvatar];
      await client.query(SQL, values);
    }
  }

}

module.exports = new Employee();
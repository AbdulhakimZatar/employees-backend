DROP TABLE IF EXISTS employees,
departments;

CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  department_id INT REFERENCES departments (id)
);

INSERT INTO departments (name) VALUES ('IT');
INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Sales');
INSERT INTO departments (name) VALUES ('Marketing');
INSERT INTO departments (name) VALUES ('Finance');
INSERT INTO departments (name) VALUES ('Quality Assurance');
INSERT INTO departments (name) VALUES ('Customer Service');
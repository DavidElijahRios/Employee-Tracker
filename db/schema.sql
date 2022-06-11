CREATE DATABASE company_employees;

USE company_employees;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(6,2),
    department_id INT FOREIGN KEY REFERENCES department(id) ON DELETE SET NULL
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL FOREIGN KEY REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INT FOREIGN KEY REFERENCES employee(id) ON DELETE SET NULL,
);
DROP DATABASE IF EXISTS employee_tracker;
CREATE database employee_tracker;

USE employee_tracker;


CREATE TABLE department (
  depto_id  INT NOT NULL,
  depto_name  VARCHAR(30) NULL,
  PRIMARY KEY ( depto_id )
  );

CREATE TABLE role_e (
  role_id INT NOT NULL,
  role_title VARCHAR(30)  NULL,
  role_salary DECIMAL (10, 2) NULL,
  depto_id INT NOT NULL,
    PRIMARY KEY ( role_id ),
    FOREIGN KEY ( depto_id) REFERENCES department ( depto_id ) 
    );

CREATE TABLE employee (
  emp_id INT, 
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY ( emp_id ),
   FOREIGN KEY ( role_id) REFERENCES role_e ( role_id ) 
  );


SELECT * FROM employee_tracker;

const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


// conection to database
const connection = mysql.createConnection({
  host: 'localhost',

// port
  port: 3306,

// database username
  user: 'root',

//  database password
  password: '********',
  database: 'employee_tracker',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

// masin menu using inquirer
const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add departments, roles, employees',
        'View departments, roles, employees',
        'Update employee roles',
        'exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add departments, roles, employees':
          addfunction();
          break;

        case 'View departments, roles, employees':
          viewfunction();
          break;

        case 'Update employee roles':
          updatefunction();
          break;

        case 'exit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// add menus 
const addfunction = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to add?',
      choices: [
        'departments',
        'roles',
        'employees',
        'go back',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'departments':
          adddepartments();
          break;

        case 'roles':
          addroles();
          break;

        case 'employees':
          addemployees();
          break;

        case 'go back':
          runSearch();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};



// add department function
const adddepartments = () => {
  inquirer
    .prompt([
      {
        name: 'depto_id',
        type: 'input',
        message: 'What is the department id',
      },
      {
        name: 'depto_name',
        type: 'input',
        message: 'What is the department name?',
      }
    ])
    .then((answer) => {
    
      connection.query(
        'INSERT INTO department SET ?',
         {
          depto_id : answer.depto_id,
          depto_name : answer.depto_name,
          },
        (err) => {
          if (err) throw err;
          console.log("department stored");
          runSearch();
        }
      );
    });
};

// add roles function
const addroles = () => {
  inquirer
    .prompt([
      {
        name: 'role_id',
        type: 'input',
        message: 'What is the role id',
      },
      {
        name: 'role_title',
        type: 'input',
        message: 'What is the role title?',
      },
      {
        name: 'role_salary',
        type: 'input',
        message: 'What is the role salary',
      }, 
       {
        name: "depto_id",
        type: "rawlist",
        message: "Select Department",
        choices: selectDepartment()
      }
      ])
    .then((answer) => {
          connection.query(
        'INSERT INTO role_e SET ?',
         {
          role_id : answer.role_id,
          role_title : answer.role_title,
          role_salary : answer.role_salary,
          depto_id : answer.depto_id,
          },
        (err) => {
          if (err) throw err;
          console.log("role stored");
          runSearch();
        }
      );
    });
};

// add employees function
const addemployees = () => {
  inquirer
    .prompt([
      {
        name: 'emp_id',
        type: 'input',
        message: 'What is the employee id',
      },
      {
        name: 'first_name',
        type: 'input',
        message: 'What is the employee first name?',
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'What is the employee last name?',
      },
      {
        name: 'role_id',
        type: 'rawlist',
        message: 'What is the employee role?',
        choices: selectRole()
      },
      {
        name: 'manager_id',
        type: 'rawlist',
        message : 'What is the employee manager id?',
        choices : selectManager()
      },
    ])
    .then((answer) => {
    
      connection.query(
        'INSERT INTO employee SET ?',
         {
          emp_id : answer.emp_id,
          first_name : answer.first_name,
          last_name : answer.last_name,
          role_id : answer.role_id,
          manager_id : answer.manager_id,
          },
        (err) => {
          if (err) throw err;
          console.log("employee stored");
          runSearch();
        }
      );
    });
};



// view menu function

const viewfunction = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to view?',
      choices: [
        'departments',
        'roles',
        'employees',
        'go back',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'departments':
          departmentSearch();
          break;

        case 'roles':
          rolesSearch();
          break;

        case 'employees':
          employeeSearch();
          break;

        case 'go back':
          runSearch();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// departments querry
const departmentSearch = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, function(err, res){
      if (err) throw err;
      console.table('All deptartments:', res);
      runSearch();
  })
};

// roles querry 
const rolesSearch = () => {
  const query = 'SELECT * FROM role_e';
  connection.query(query, function(err, res){
      if (err) throw err;
      console.table('All roles:', res);
      runSearch();
  })
};

// employee querry
const employeeSearch = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, function(err, res){
      if (err) throw err;
      console.table('All employees:', res);
      runSearch();
  })
};                       

// update function for giving a new role to employees
const  updatefunction = ()  => {
  connection.query("SELECT employee.last_name, role_e.role_title FROM employee JOIN role_e ON employee.role_id = role_e.role_id;", 
  function(err, res) {
      if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              const lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(answer) {
        const roleId = selectRole().indexOf(answer.role) + 1
        connection.query("UPDATE employee SET ? WHERE ?",
        [   {
          role_id: answer.role   
        }, 
        {
          last_name: answer.lastName
           
        }, 
      ] ,
      function(err){
            if (err) throw err
            console.log("employee updated")
            runSearch()
        })
  
    });
  });

};

// role array for role list
const roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role_e", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].role_id);
    }

  })
  return roleArr;
}

// department array for department list
const deptArr = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      deptArr.push(res[i].depto_id);
    }

  })
  return deptArr;
}

// manager array for manager list
const managersArr = [];
function selectManager() {
  connection.query("SELECT * FROM employee WHERE manager_id = 0", 
  function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].emp_id);
    }
  })
  return managersArr;
}



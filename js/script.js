/* 
 * Hey Zak:
 *
 * My sincere apologies for how late this assignment was turned in. Some of the
 * the most recent topics covered in 690 and 692 were a bit difficult for me to 
 * grasp and I wanted to make sure I understood them before moving on. Even
 * though I wasn't able to get my buildGrid function to work, I still wanted to
 * turn in what I had so far before we reviewed the assignment in class. My
 * best guess is that I'm not properly importing loadData from because I'm
 * using Node.js modules in a browser environment.
 * 
 * Thanks for your patience and understanding.
 */

// CREATE AN ARRAY OF EMPLOYEES
let arrEmployees = [
    [34123413, "Zak Ruvalcaba", 3424, "zak@vectacorp.com", "Executive"],
    [23424665, "Sally Smith", 2344, "sally@vectacorp.com", "Administrative"],
    [12341244, "Mark Martin", 5352, "mark@vectacorp.com", "Sales"],
    [14545423, "Robin Banks", 7867, "robin@vectacorp.com", "Marketing"],
    [13413453, "Sue Wedge", 1235, "sue@vectacorp.com", "QA"]
];

// Let's map arrEmployees into an array of JSON objects

const fs = require('fs');
const path = require('path');

let arrEmployeesJSON = arrEmployees.map(employee => {
    return {
        id: employee[0],
        name: employee[1],
        extension: employee[2],
        email: employee[3],
        department: employee[4]
    };
});

// Now let's write arrEmployeesJSON to /data/employees.json

const filePath = path.join(__dirname, '..', 'data', 'employees.json');
fs.writeFileSync(filePath, JSON.stringify(arrEmployeesJSON, null, 2), 'utf-8');

// Now let's import loadData from init.js to script.js

const loadData = require('./modules/init.js');

// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees');
let empCount    = document.querySelector('#empCount');

async function init() {
    let employees = await loadData();
    console.log(employees); // Just to make sure it's working
    buildGrid(employees);
}

init();

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex);
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid(employees) {
    console.log('Building grid with', employees, '...'); // Just to make sure it's working

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employees) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.extension}</td>
            <td><a href="mailto:${employee.email}">${employee.email}</a></td>
            <td>${employee.department}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `;
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${employees.length})`;
}
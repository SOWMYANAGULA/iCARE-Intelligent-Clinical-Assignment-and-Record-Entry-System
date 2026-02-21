// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS UserRole (
        roleID int primary key not null auto_increment,
        roleName varchar(10),
        permission varchar(60)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from UserRole', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into UserRole values
            (1, 'Doctor', 'Add Patient'),
            (2, 'Doctor', 'Manage Patient Record'),
            (3, 'Doctor', 'Manage Document'),
            (4, 'Nurse', 'Add Patient'),
            (5, 'Nurse', 'Manage Patient Record'),
            (6, 'Nurse', 'Import Images'),
            (7, 'Admin', 'Add Worker'),
            (8, 'Admin', 'Manage Worker Record')
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
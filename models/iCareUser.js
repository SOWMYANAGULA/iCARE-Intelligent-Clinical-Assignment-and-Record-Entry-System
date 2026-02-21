// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS iCareUser (
        ID int primary key not null auto_increment,
        Name varchar(50)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from iCareUser', function (err, result) {
        /*
        Admin, Doctor, Doctor, Nurse, Nurse
        */
        if (result.length === 0) {
            let sqlrun = `insert into iCareUser values
            (1, 'Ron'),
            (2, 'John'),
            (3, 'Emily'),
            (4, 'Tim'),
            (5, 'Cristina')
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
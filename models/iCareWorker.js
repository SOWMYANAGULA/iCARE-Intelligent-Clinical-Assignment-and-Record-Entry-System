// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS iCareWorker (
        profession varchar(10),
        ID int,
        location varchar(50),
        createdBy int,
        foreign key(ID) references iCareUser(ID),
        foreign key(createdBy) references iCareAdmin(ID)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from iCareWorker', function (err, result) {
        /*
        Admin, Doctor, Doctor, Nurse, Nurse
        */
        if (result.length === 0) {
            let sqlrun = `insert into iCareWorker values
            ('Doctor', 2, 'Austin', 1),
            ('Doctor', 3, 'Lakeway', 1),
            ('Nurse', 4, 'Austin', 1),
            ('Nurse', 5, 'Lakeway', 1)
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}

module.exports = { create, add };
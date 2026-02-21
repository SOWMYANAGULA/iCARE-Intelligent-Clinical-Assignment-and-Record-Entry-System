// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS iCareAdmin (
        dateHired varchar(20),
        dateFinished varchar(20),
        ID int,
        foreign key(ID) references iCareUser(ID)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from iCareAdmin', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into iCareAdmin values ('12-11-2022', '30-12-2022', 1)`;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
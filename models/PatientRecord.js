// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS PatientRecord (
        ID int primary key not null auto_increment,
        Name varchar(50),
        address varchar(255),
        dateOfBirth varchar(10),
        height float,
        weight float,
        bloodGroup varchar(5),
        bedID varchar(20),
        treatmentArea varchar(50),
        createdBy int,
        modifiedBy int,
        foreign key(address) references GeoCodes(ID),
        foreign key(createdBy) references iCareWorker(ID),
        foreign key(modifiedBy) references iCareWorker(ID)
    )`;
    mysqlcon.query(sql);
}

function add() {
    mysqlcon.query('select * from PatientRecord', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into PatientRecord values
            (1, 'Harry', 'Lakeway', '11-06-1992', 163, 62.5, 'B+', 'Bed L6', 'A2', 2, 2),
            (2, 'William', 'Austin', '05-06-1992', 165, 60.5, 'AB+', 'Bed L2', 'L2', 2, 2),
            (3, 'Jack', 'Austin', '15-11-1950', 155, 70.5, 'O+', 'Bed B3', 'L2', 3, 3),
            (4, 'Mia', 'Lakeway', '11-05-1991', 162.5, 58, 'A-', 'Bed A9', 'A2', 3, 3),
            (5, 'Rhea', 'Austin', '07-08-1960', 158.8, 60.5, 'B+', 'Bed L7', 'L3', 4, 4),
            (6, 'Angela', 'Lakeway', '06-12-1975', 160, 50, 'AB-', 'Bed A3', 'A3', 5, 5),
            (7, 'Tom', 'Lakeway', '05-05-1995', 161.5, 72, 'B-', 'Bed A6', 'A3', 5, 5),
            (8, 'Emma', 'Austin', '03-12-1992', 156.5, 56, 'O+', 'Bed L4', 'L2', 4, 4),
            (9, 'Jay', 'Austin', '14-02-1987', 165, 60, 'O-', 'Bed L11', 'L3', 2, 2),
            (10, 'Pearl', 'Austin', '13-11-2000', 155, 63, 'AB+', 'Bed L10', 'L2', 3, 3)
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}

module.exports = { create , add };
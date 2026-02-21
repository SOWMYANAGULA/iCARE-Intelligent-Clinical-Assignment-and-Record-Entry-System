// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS DrugsDictionary (
        drugId int primary key not null auto_increment,
        drugName varchar(60)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from DrugsDictionary', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into DrugsDictionary values
            (1, 'Atorvastatin'),
            (2, 'Levothyroxine'),
            (3, 'Metformin'),
            (4, 'Lisinopril'),
            (5, 'Amlodipine'),
            (6, 'Metoprolol'),
            (7, 'Albuterol'),
            (8, 'Omeprazole'),
            (9, 'Losartan'),
            (10, 'Gabapentin'),
            (11, 'Montelukast'),
            (12, 'Escitalopram'),
            (13, 'Pantoprazole'),
            (14, 'Tamsulosin'),
            (15, 'Meloxicam')
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
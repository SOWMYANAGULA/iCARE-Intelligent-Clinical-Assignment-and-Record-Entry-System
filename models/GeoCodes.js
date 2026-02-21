// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS GeoCodes (
        ID varchar(20) primary key not null,
        description varchar(50)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from GeoCodes', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into GeoCodes values
            ('Killeen', 'Killeen Bell'),
            ('Lampasas', 'Lampasas'),
            ('Waco', 'Waco McLennan'),
            ('Kyle', 'Kyle'),
            ('Burnet', 'Burnet'),
            ('Austin', 'Austin Travis'),
            ('Round Rock', 'Round Rock Williamson'),
            ('Conroe', 'Conroe'),
            ('San Antonio', 'San Antonio'),
            ('Lakeway', 'Lakeway Travis'),
            ('Temple', 'Temple Bell'),
            ('Harker Heights', 'Harker Heights Bell')
            `;
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
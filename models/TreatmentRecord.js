// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS TreatmentRecord (
        treatmentId int primary key not null auto_increment,
        docId int,
        drugName varchar(30),
        drugQuantity int,
        description varchar(255),
        treatmentDate varchar(20),
        foreign key(docId) references DocumentMetadata(docId)
    )`;
    mysqlcon.query(sql);
}

module.exports = { create };
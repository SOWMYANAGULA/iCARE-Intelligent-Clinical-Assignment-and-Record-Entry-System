// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS ModificationHistory (
        modId int primary key not null auto_increment,
        docId int,
        modifiedBy int,
        dateOfModification varchar(20),
        description varchar(255),
        foreign key(docId) references DocumentMetadata(docId),
        foreign key(modifiedBy) references iCareWorker(ID)
    )`;
    mysqlcon.query(sql);
}

module.exports = { create };
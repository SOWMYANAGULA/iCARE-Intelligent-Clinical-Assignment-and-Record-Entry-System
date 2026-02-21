// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS DocumentMetadata (
        docId int primary key not null auto_increment,
        docName varchar(60),
        dateOfCreation varchar(20),
        patientRecordId int,
        createdBy int,
        foreign key(patientRecordId) references PatientRecord(ID),
        foreign key(createdBy) references iCareWorker(ID)
    )`;
    mysqlcon.query(sql);
}

module.exports = { create };
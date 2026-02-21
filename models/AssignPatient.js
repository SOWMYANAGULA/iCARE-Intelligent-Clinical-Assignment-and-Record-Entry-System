// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS AssignPatient (
        assignId int primary key not null auto_increment,
        workerId int,
        patientRecordId int,
        foreign key(workerId) references iCareWorker(ID),
        foreign key(patientRecordId) references PatientRecord(ID)
    )`;
    mysqlcon.query(sql);
}

module.exports = { create };
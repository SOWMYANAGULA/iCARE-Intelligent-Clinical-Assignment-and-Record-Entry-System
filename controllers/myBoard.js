const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/myBoard', (req, res) => {
        var sql = 'SELECT * FROM PatientRecord, AssignPatient where workerId="' + thisuserId + '" and patientRecordId=ID';
        mysqlcon.query(sql, function (err, data) {
            res.render('myBoard', { data: data })
        });
    })
}
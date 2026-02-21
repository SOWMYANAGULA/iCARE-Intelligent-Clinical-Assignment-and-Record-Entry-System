const mysqlcon = require('../connection');

module.exports = function (app) {
    app.get('/assignPatient/:id', (req, res) => {
        var data = {
            workerId: thisuserId,
            patientRecordId: req.params.id
        }

        var sql = 'select * from AssignPatient where workerId="' + thisuserId + '" and patientRecordId="' + req.params.id + '"';
        mysqlcon.query(sql, (err, d) => {
            if (d.length == 0) {
                sql = 'INSERT into AssignPatient SET ? ';
                mysqlcon.query(sql, data, (err, result) => {
                    if (err) throw err;
                });
            }
        });
        res.redirect('/myBoard');
    })
}
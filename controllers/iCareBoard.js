const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/iCareBoard', (req, res) => {
        var sql = 'SELECT location FROM iCareWorker where ID="' + thisuserId + '"';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            console.log(data);
            sql = 'SELECT * FROM PatientRecord where address="' + data[0].location + '"';
            mysqlcon.query(sql, function (err, data) {
                res.render('iCareBoard', { data: data });
            });
        });
    })
}
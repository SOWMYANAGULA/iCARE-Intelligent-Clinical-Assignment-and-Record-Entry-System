const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/adminDashboard', (req, res) => {
        var sql = 'SELECT * FROM iCareWorker';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            res.render('adminDashboard', { data: data });
        });
    });
}
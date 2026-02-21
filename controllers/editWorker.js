const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/workerEdit/:id', function (req, res, next) {
        var id = req.params.id;
        var sql = 'SELECT * FROM iCareUser WHERE ID = "' + id + '"';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            var ID = data[0].ID;
            var Name = data[0].Name;
            sql = 'SELECT * FROM UserPassword WHERE ID = "' + id + '"';
            mysqlcon.query(sql, function (err, data) {
                if (err) throw err;
                var userName = data[0].userName;
                var passwordExpiryTime = data[0].passwordExpiryTime;
                var userAccountExpiryDate = data[0].userAccountExpiryDate;
    
                sql = 'SELECT ID FROM GeoCodes';
                mysqlcon.query(sql, function (err, data) {
                    if (err) throw err;
                    var editData = {
                        ID: ID,
                        Name: Name,
                        userName: userName,
                        passwordExpiryTime: passwordExpiryTime,
                        userAccountExpiryDate: userAccountExpiryDate
                    }
                    res.render('workerEdit', { data: editData, loc: data });
                });
            });
        });
    
    });
    
    app.post('/WorkerEdit/:id', function (req, res, next) {
        var id = req.params.id;
    
        var data = {
            Name: req.body.Name
        }
        var sql = 'UPDATE iCareUser SET ? WHERE ID= ? ';
        mysqlcon.query(sql, [data, id], (err, result) => {
            if (err) throw err;
        });
    
        data = {
            profession: req.body.Profession,
            location: req.body.Location
        }
        sql = 'UPDATE iCareWorker SET ? WHERE ID= ? ';
        mysqlcon.query(sql, [data, id], (err, result) => {
            if (err) throw err;
        });
        data = {
            username: req.body.Username,
            passwordExpiryTime: req.body.passwordExpiryTime,
            userAccountExpiryDate: req.body.userAccountExpiryDate
        }
    
        sql = 'UPDATE UserPassword SET ? WHERE ID= ? ';
        mysqlcon.query(sql, [data, id], (err, result) => {
            if (err) throw err;
        });
    
        res.redirect('/adminDashboard');
    });
}
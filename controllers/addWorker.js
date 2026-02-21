const mysqlcon = require('../connection');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.get('/addWorker', (req, res) => {
        var sql = 'SELECT ID FROM GeoCodes';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            res.render('addWorker', { data: data });
        });
    });

    app.post('/addWorker', (req, res) => {
        var data = {
            Name: req.body.Name
        }
        var sql = 'INSERT into iCareUser SET ? ';
        mysqlcon.query(sql, data, (err, result) => {
            if (err) throw err;
        });
    
        sql = 'SELECT ID FROM iCareUser where Name ="' + req.body.Name + '"';
    
        mysqlcon.query(sql, (err, d) => {
            data = {
                profession: req.body.Profession,
                ID: d[0].ID,
                location: req.body.Location,
                createdBy: thisuserId
            }
    
            sql = 'INSERT into iCareWorker SET ? ';
            mysqlcon.query(sql, data, (err, result) => {
                if (err) throw err;
            });
    
            bcrypt.hash(req.body.Password, 8, function (err, hash) {
                data = {
                    ID: d[0].ID,
                    username: req.body.Username,
                    encryptedPassword: hash,
                    passwordExpiryTime: req.body.passwordExpiryTime,
                    userAccountExpiryDate: req.body.userAccountExpiryDate
                }
    
                sql = 'INSERT into UserPassword SET ? ';
                mysqlcon.query(sql, data, (err, result) => {
                    if (err) throw err;
                });
            });
        });
        res.redirect('/adminDashboard');
    });
}
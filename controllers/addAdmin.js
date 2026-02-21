const mysqlcon = require('../connection');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.get('/addAdmin', (req, res) => {
        res.render('addAdmin');
    });

    app.post('/addAdmin', (req, res) => {
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
                dateHired: req.body.dateHired,
                ID: d[0].ID,
                dateFinished: req.body.dateFinished
            }
    
            sql = 'INSERT into iCareAdmin SET ? ';
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
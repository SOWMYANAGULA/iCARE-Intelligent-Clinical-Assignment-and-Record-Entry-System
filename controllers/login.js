const mysqlcon = require('../connection');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.get('/loginDoctor', (req, res) => {
        res.render('login', { role: "Doctor" });
    });
    
    app.get('/loginNurse', (req, res) => {
        res.render('login', { role: "Nurse" });
    });
    
    app.get('/loginAdmin', (req, res) => {
        res.render('login', { role: "Admin" });
    });

    app.post('/login/Doctor', (req, res) => {
        username = req.body.username;
        pwd = req.body.pwd;
    
        mysqlcon.query('SELECT * FROM UserPassword WHERE username ="' + username + '"', function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(result);
                bcrypt.compare(pwd, result[0].encryptedPassword, function (err, resu) {
                    if (resu) {
                        mysqlcon.query('SELECT * FROM iCareWorker WHERE ID = "' + result[0].ID + '"', (err, isworker) => {
                            if (isworker.length > 0) {
                                if (isworker[0].profession == "Doctor") {
                                    thisuserRole = "doctor";
                                    thisuserId = result[0].ID;
                                    res.redirect('/iCareBoard');
                                } else {
                                    res.render('error', { message: "Something went Wrong" })
                                }
                            } else {
                                res.render('error', { message: "You are not a Doctor" });
                            }
                        });
                    } else {
                        res.render('error', { message: 'Incorrect password' });
                    }
                });
            } else {
                res.render('error', { message: 'User does not exist' });
            }
        })
    });
    
    app.post('/login/Nurse', (req, res) => {
        username = req.body.username;
        pwd = req.body.pwd;
    
        mysqlcon.query('SELECT * FROM UserPassword WHERE username ="' + username + '"', function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(result);
                bcrypt.compare(pwd, result[0].encryptedPassword, function (err, resu) {
                    if (resu) {
                        mysqlcon.query('SELECT * FROM iCareWorker WHERE ID = "' + result[0].ID + '"', (err, isworker) => {
                            if (isworker.length > 0) {
                                if (isworker[0].profession == "Nurse") {
                                    thisuserRole = "nurse";
                                    thisuserId = result[0].ID;
                                    res.redirect('/iCareBoard');
                                } else {
                                    res.render('error', { message: "Something went Wrong" })
                                }
                            } else {
                                res.render('error', { message: "You are not a Nurse" });
                            }
                        });
                    } else {
                        res.render('error', { message: 'Incorrect password' });
                    }
                });
            } else {
                res.render('error', { message: 'User does not exist' });
            }
        })
    });
    
    app.post('/login/Admin', (req, res) => {
        username = req.body.username;
        pwd = req.body.pwd;
    
        mysqlcon.query('SELECT * FROM UserPassword WHERE username ="' + username + '"', function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                console.log(result);
                bcrypt.compare(pwd, result[0].encryptedPassword, function (err, resu) {
                    if (resu) {
                        mysqlcon.query('SELECT * FROM iCareAdmin WHERE ID = "' + result[0].ID + '"', (err, isadmin) => {
                            if (isadmin.length > 0) {
                                thisuserRole = 'admin';
                                thisuserId = result[0].ID;
                                res.redirect('/adminDashboard');
                            } else {
                                res.render('error', { message: "You are not an Admin" });
                            }
                        });
                    } else {
                        res.render('error', { message: 'Incorrect password' });
                    }
                });
            } else {
                res.render('error', { message: 'User does not exist' });
            }
        })
    });
}
const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/importImage/:id', (req, res) => {
        if(thisuserRole == "doctor") {
            res.render('error', {message: "You do not have permission to access this page"});
        }
        res.render('importImage', { ID: req.params.id })
    })
    
    app.post('/importImage/:id', (req, res) => {
        var data = {
            docName: req.body.filename,
            dateOfCreation: new Date().toLocaleDateString(),
            patientRecordId: req.params.id,
            createdBy: thisuserId
        }
    
        var sql = 'INSERT into DocumentMetadata SET ? ';
        mysqlcon.query(sql, data, (err, result) => {
            if (err) throw err;
        });
    
        res.redirect('/displayPalette/' + req.params.id)
    })
}
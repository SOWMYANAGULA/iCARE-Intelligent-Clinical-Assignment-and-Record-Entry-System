const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/addPatient', (req, res) => {
        var sql = 'SELECT ID FROM GeoCodes';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            res.render('addPatient', { data: data });
        });
    });
    
    app.post('/addPatient', (req, res) => {
        var data = {
            Name: req.body.Name,
            address: req.body.Address,
            DateOfBirth: req.body.DateOfBirth,
            Height: req.body.Height,
            Weight: req.body.Weight,
            BloodGroup: req.body.BloodGroup,
            BedId: req.body.BedID,
            TreatmentArea: req.body.TreatmentArea,
            createdBy: thisuserId,
            modifiedBy: thisuserId
        }
    
        sql = 'INSERT into PatientRecord SET ? ';
        mysqlcon.query(sql, data, (err, result) => {
            if (err) throw err;
        });
    
        res.redirect('/iCareBoard')
    })
}
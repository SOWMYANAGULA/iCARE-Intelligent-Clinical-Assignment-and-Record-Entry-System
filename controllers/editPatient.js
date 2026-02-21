const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/patientEdit/:id', (req, res) => {
        var id = req.params.id;
        var sql = 'SELECT * FROM PatientRecord WHERE ID = "' + id + '"';
        mysqlcon.query(sql, function (err, data) {
            if (err) throw err;
            sql = 'SELECT ID FROM GeoCodes';
            mysqlcon.query(sql, function (err, loc) {
                res.render('patientEdit', { data: data[0], loc: loc });
            })
    
        });
    });
    
    app.post('/patientEdit/:id', (req, res) => {
        var id = req.params.id;
    
        var updateData = {
            Name: req.body.Name,
            address: req.body.Address,
            DateOfBirth: req.body.DateOfBirth,
            Height: req.body.Height,
            Weight: req.body.Weight,
            BloodGroup: req.body.BloodGroup,
            BedId: req.body.BedID,
            TreatmentArea: req.body.TreatmentArea,
            modifiedBy: thisuserId
        }
    
        var sql = `UPDATE PatientRecord SET ? WHERE ID= ?`;
        mysqlcon.query(sql, [updateData, id], function (err, data) {
            if (err) throw err;
        });
        res.redirect('/iCareBoard');
    })
}
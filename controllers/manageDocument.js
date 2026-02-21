const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/document/:id', (req, res) => {
        if(thisuserRole == "nurse") {
            res.render('error', {message: "You do not have permission to access this page"});
        }
        var sql = 'select d.docId, d.docName, d.dateOfCreation, d.createdBy from DocumentMetadata as d, TreatmentRecord as t where t.docId=d.docId and d.patientRecordId="' + req.params.id + '"';
        mysqlcon.query(sql, (err, data) => {
            res.render('document', { ID: req.params.id, data: data });
        });
    });
    
    app.get('/documentAdd/:id', (req, res) => {
        res.render('documentAdd', { ID: req.params.id })
    });
    
    app.post('/documentAdd/:id', (req, res) => {
        var data = {
            docName: req.body.docName,
            dateOfCreation: new Date().toLocaleDateString(),
            patientRecordId: req.params.id,
            createdBy: thisuserId
        }
    
        var sql = 'INSERT into DocumentMetadata SET ? ';
        mysqlcon.query(sql, data, (err, result) => {
            if (err) throw err;
            sql = 'SELECT docId FROM DocumentMetadata WHERE docName = "' + req.body.docName + '"';
            mysqlcon.query(sql, function (err, d) {
                if (err) throw err;
                data = {
                    docId: d[0].docId,
                    drugName: req.body.drugName,
                    drugQuantity: req.body.Quantity,
                    description: req.body.Description,
                    treatmentDate: new Date().toLocaleDateString()
                }
    
                sql = 'INSERT into TreatmentRecord SET ? ';
                mysqlcon.query(sql, data, function (err, d) {
                    if (err) throw err;
                    res.redirect('/displayPalette/' + req.params.id)
                })
            })
    
        });
    })
    
    app.get('/documentEdit/:docId/:prId', (req, res) => {
        var sql = 'select * from TreatmentRecord where docId="' + req.params.docId + '"';
        mysqlcon.query(sql, (err, data) => {
            res.render('documentEdit', { ID: req.params.prId, data: data })
        })
    });
    
    app.post('/documentEdit/:docId/:prId', (req, res) => {
        var docId = req.params.docId;
        var updateData = {
            drugName: req.body.drugName,
            drugQuantity: req.body.Quantity,
            description: req.body.Description,
            treatmentDate: new Date().toLocaleDateString()
        };
        var sql = `UPDATE TreatmentRecord SET ? WHERE docId= ?`;
        mysqlcon.query(sql, [updateData, docId], function (err, d) {
            if (err) throw err;
    
            updateData = {
                docId: docId,
                modifiedBy: thisuserId,
                dateOfModification: new Date().toLocaleDateString(),
                description: req.body.drugName + ' ' + req.body.Quantity + ' ' + req.body.Description
            }
    
            sql = 'INSERT into ModificationHistory SET ? ';
            mysqlcon.query(sql, updateData, function (err, d) {
                if (err) throw err;
                res.redirect('/displayPalette/' + req.params.prId)
            })
        });
    })
}
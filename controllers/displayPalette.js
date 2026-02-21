const mysqlcon = require('../connection');

module.exports = function(app) {
    app.get('/displayPalette/:id', (req, res) => {
        res.render('displayPalette', { ID: req.params.id });
    });
}
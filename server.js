// Requiring libraries
const bodyParser = require('body-parser');
const express = require('express');
const mysqlcon = require('./connection');
const ejs = require("ejs");
var path = require('path');
const bcrypt = require('bcrypt');

// Linking Models
var iCareUser = require('./models/iCareUser')
iCareUser.create();
iCareUser.add();
var iCareAdmin = require('./models/iCareAdmin')
iCareAdmin.create();
iCareAdmin.add();
var iCareWorker = require('./models/iCareWorker')
iCareWorker.create();
iCareWorker.add();
var UserPassword = require('./models/UserPassword')
UserPassword.create();
UserPassword.add();
var UserRole = require('./models/UserRole')
UserRole.create();
UserRole.add();
var GeoCodes = require('./models/GeoCodes')
GeoCodes.create();
GeoCodes.add();
var PatientRecord = require('./models/PatientRecord')
PatientRecord.create();
PatientRecord.add();
var AssignPatient = require('./models/AssignPatient')
AssignPatient.create();
var DocumentMetadata = require('./models/DocumentMetadata')
DocumentMetadata.create();
var TreatmentRecord = require('./models/TreatmentRecord')
TreatmentRecord.create();
var ModificationHistory = require('./models/ModificationHistory')
ModificationHistory.create();
var DrugsDictionary = require('./models/DrugsDictionary')
DrugsDictionary.create();
DrugsDictionary.add();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

global.thisuserId = "*";
global.thisuserRole = "*";

// Linking Controllers
require('./controllers/addPatient')(app);
require('./controllers/addWorker')(app);
require('./controllers/adminDashboard')(app);
require('./controllers/assignPatient')(app);
require('./controllers/displayPalette')(app);
require('./controllers/editPatient')(app);
require('./controllers/editWorker')(app);
require('./controllers/iCareBoard')(app);
require('./controllers/importImage')(app);
require('./controllers/login')(app);
require('./controllers/manageDocument')(app);
require('./controllers/myBoard')(app);
require('./controllers/addAdmin')(app);

// Landing Page
app.get('/', (req, res) => {
    res.render('landingPage');
});

// Server Listen
app.listen(3000, function () {
    console.log('server started on port 3000');
});
// Connect to Database
const mysqlcon = require('../connection');

// Create table 

function create() {
    let sql = `CREATE TABLE IF NOT EXISTS UserPassword (
        ID int,
        userName varchar(20),
        encryptedPassword varchar(255),
        passwordExpiryTime int,
        userAccountExpiryDate varchar(20),
        foreign key(ID) references iCareUser(ID)
    )`;
    mysqlcon.query(sql);
}

// Add data

function add() {
    mysqlcon.query('select * from UserPassword', function (err, result) {
        if (result.length === 0) {
            let sqlrun = `insert into UserPassword values
            (1, 'AdminRon', '$2b$08$nfpTH1GHnnA9L/5M7CYWs.4jDVLbgxgmaV1fltcaPYSBckQCRhgjG', 30, '30-12-2022'),
            (2, 'DrJohn', '$2b$08$.LRGSzC1p.XOoTz.YgF57OEQrnfV6Ws7SfMBbOr8GlUf66y6VsblW', 20, '30-12-2022'),
            (3, 'DrEmily', '$2b$08$U19kPf1kD3GQZ4BdprgdKeHdOieZkupVyGI.XwqsRT/GS3k8NY122', 26, '30-12-2022'),
            (4, 'NrTim', '$2b$08$iuNQ2RSneANij8vPuhmJ0Ob0F0sKMCYM07mg9sGsSPHnx8KdmOKbi', 12, '12-12-2022'),
            (5, 'NrCristina', '$2b$08$BHFF6mNhqmowFadPcnzTMu6vx/z03DUCJLEWyFhBfKrolhJuJ4gxq', 30, '30-12-2022')
            `;
            /*Admin@123 John@123 Emily@123 Tim@1234 Cristina@123*/
            mysqlcon.query(sqlrun, (err, result) => {
                if (err) throw err;
            });
        }
    });
}


module.exports = { create, add };
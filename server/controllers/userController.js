// require("../../server.js")
// var mysql = require("mysql");
// connection = mysql.);
console.log('SERVER > userController'.blue);

module.exports = {

    // =========== CREATE new user ===========
    newUser: (req, res) => {
        console.log('>>> USER CONTROLLER >>> newUser');
        // connection.connect(function(err) {
        //     if (err) throw err;
            console.log("Connected!");
            console.log("MySQL connected as id ".yellow + connection.threadId)
            var sql = `INSERT INTO UserSQL_DB.users (fname, lname, email, pass, created_at, updated_at) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.pass}', NOW(), NOW() );`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result.affectedRows + ' record(s) created');
                res.json({message: 'ok', result: result});
            });
            // connection.end((err) => {
            //     if (err) {
            //         console.log('terminated with err =>', err)
            //     }
            //     console.log('connection -> MySQL ENDED'.bgWhite.black);
            //     // The connection is terminated gracefully
            //     // Ensures all previously enqueued queries are still
            //     // before sending a COM_QUIT packet to the MySQL server.
            // });
        // });
    },

    getUsers: (req, res) => {
        console.log('>>> USER CONTROLLER >>> newUser');
        // connection.connect(function(err) {
        //     if (err) throw err;
            console.log("Connected!");
            console.log("MySQL connected as id ".yellow + connection.threadId)
            var sql = `SELECT * FROM UserSQL_DB.users;`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log(result);
                res.json({message: 'ok', result: result});
            });
            // connection.end((err) => {
            //     // if (err) {
            //     //     console.log('terminated with err =>', err)
            //     // }
            //     console.log('connection -> MySQL ENDED'.bgWhite.black);
            //     // The connection is terminated gracefully
            //     // Ensures all previously enqueued queries are still
            //     // before sending a COM_QUIT packet to the MySQL server.
            // });
        },
    // );

// ==================== LOGIN check user ================
    checkUser: (req, res) => {
        console.log('req.body.email =>'.green, req.body.email);
        console.log('>>> USER CONTROLLER >>> CHECK USER');
        console.log("MySQL connected as id ".yellow + connection.threadId)
        // var sql = `SELECT EXISTS(SELECT * FROM UserSQL_DB.users WHERE email= '${req.body.email}');`;
        var sql =`SELECT email FROM users WHERE email='${req.body.email}';`;
        connection.query(sql, function(err, bool_result) {
            if (err) throw err;
            console.log('check user is => '.bgGreen.black, bool_result);
            console.log('=======', bool_result[0]);
            // if (bool_result[0] === undefined) {
            if (bool_result.length < 1) {
                console.log('FAIL!!!!!!!!');
                res.json({message: 'NO MATCH email', canLogin: false});
            }
            else if (bool_result.length > 0) {
                console.log('WIN length > 0 +1');
                res.json({message: 'SUCCESS email MATCHES!', canLogin: true})
            } else {
                console.log('ERROR')
                res.json({message: 'ERROR ERROR possible hacker!', canLogin: false})
            }
            // res.json({message: 'bool', bool_result: bool_result});
        });
    }







    }




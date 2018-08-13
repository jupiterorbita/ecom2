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

// ============== FETCH ALL USERS ==================
    getUsers: (req, res) => {
        console.log('>>> USER CONTROLLER >>> newUser');
        // connection.connect(function(err) {
        //     if (err) throw err;
            console.log("Connected!");
            console.log("MySQL connected as id ".yellow + connection.threadId)
            var sql = `SELECT id, fname, lname, email, pass, admin, DATE_FORMAT(created_at, "%d-%c-%Y, %H:%i") as 'date_created' FROM UserSQL_DB.users ORDER BY id;`;
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log('RESULT SQL QUERY =>', result);
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
        console.log('req.body.pass  =>'.green, req.body.pass);
        console.log('>>> USER CONTROLLER >>> CHECK USER');
        console.log("MySQL connected as id ".yellow + connection.threadId)
        // var sql = `SELECT EXISTS(SELECT * FROM UserSQL_DB.users WHERE email= '${req.body.email}');`;
        // var sql =`SELECT email FROM users WHERE email='${req.body.email}';`;
        var sql = `SELECT id, admin FROM users WHERE email='${req.body.email}' AND pass='${req.body.pass}' LIMIT 1;`
        connection.query(sql, function(err, bool_result) {
            if (err) throw err;
            console.log('check user is => '.bgGreen.black, bool_result);

            if (bool_result.length < 1) {
                console.log('FAIL!!!!!!!!'.bgRed);
                res.json({
                    message: 'NO MATCH email or pass', 
                    canLogin: false, 
                });
            }
            else if (bool_result.length > 0) {
                console.log('=======> store id in session = '.bgGreen.black, bool_result[0].id);
                // store in session
                // if admin
                if (bool_result[0].admin === 1) {
                    console.log('is admin =>', bool_result[0].admin);
                    req.session.userid = bool_result[0].id;
                    res.json({
                        message: 'SUCCESS email & pass MATCHES!', 
                        canLogin: true,
                        powerLevel: 9001 
                    });
                }
                else if (bool_result[0].admin != 1) {
                    req.session.userid = bool_result[0].id;
                    console.log('IS ADMIN? =>', bool_result[0].admin)
                    console.log('req.session.userid =>', req.session.userid);
                    console.log('WIN length > 0 +1');
                    res.json({
                        message: 'SUCCESS email & pass MATCHES! but you have no power here!', 
                        canLogin: true,
                        powerLevel: 0 
                    });
                }
            } 
        });
    }



// ========= SET ADMIN ==========
// UPDATE UserSQL_DB.users SET admin = '1' WHERE id = 1;



    }




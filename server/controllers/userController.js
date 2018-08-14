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
            var sql = `INSERT INTO UserSQL_DB.users (fname, lname, email, pass, created_at, updated_at, admin) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${req.body.pass}', NOW(), NOW(), '0');`;
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

            // check if result is ok ------ to do NOT by length
            if (bool_result.length < 1) {
                console.log('FAIL!!!!!!!!'.bgRed);
                res.json({
                    message: 'NO MATCH email or pass', 
                    canLogin: false, 
                });
            }
            else if (bool_result.length > 0) {
                console.log('=======> store id in session = '.bgGreen.black, bool_result[0].id);
                if (bool_result[0].admin === 1) { // check if admin
                    console.log('is admin =>', bool_result[0].admin);
                    req.session.userid = bool_result[0].id; // store in session
                    res.json({
                        message: 'SUCCESS email & pass MATCHES!', 
                        canLogin: true,
                        powerLevel: 9999 
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
    },



// ========= SET ADMIN ==========
// UPDATE UserSQL_DB.users SET admin = '1' WHERE id = 1;



// ========== CHECK SESSION ==========
    checkSession: (req, res) => {
        console.log('inside > SERVER > checkSession > USER CONTROLLER');
        if (req.session['userid']) {
            console.log('session exists'.bgBlue.white, req.session['userid']);
            res.json({message: `session exists with ${req.session['userid']}`, continue: true});
        } else {
            console.log('NO USER ID IN SESSION'.bgBlue.white, req.session['userid']);
            res.json({message: `NO SESSION EXISTS! STOP & REDIRECT!`, continue: false});
        }
    },

// ========== CHECK ADMIN RIGHTS ===========
    checkIfAdmin: (req, res) => {
        console.log('inside > SERVER > checkIfAdmin > USER CONTROLLER');
        console.log(`req.session['userid'] =>`.bgYellow.black, req.session['userid']);
        var sql = `SELECT admin FROM UserSQL_DB.users WHERE id='${req.session['userid']}';`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('RESULT SQL QUERY =>', result);
            console.log('RESULT SQL QUERY result[0]["admin"] =>', result[0]);
            if (result.length < 1 ) {
                console.log(`!!! NOT ADMIN this userid => ${req.session['userid']}`);
                res.json({message: 'not admin', powerLevel:0});
            } else if (result.length > 0 ) {
                if (result[0]['admin'] === 1 ) {
                    console.log(`user is ADMIN! from db => ${result[0]['admin']}, (1=admin, 0=NO)`);
                    res.json({message: 'IS ADMIN', powerLevel:9999});
                } else { 
                    console.log('admin is NULL and array.lengh is 1 !!!!');
                }
            } 
            // res.json({message: 'ok', result: result});
        });
    },


// ============= DESTROY SESSION =============
    destroySession: (req, res) => {
        console.log('userController > destroySession()');
        console.log('req.session =>'.cyan, req.session);
        console.log('--------');
        // console.log('sessionStorage', sessionStorage);
        console.log('--------');
        // console.log('session', session);
        // req.session['userid'] = null;
        // req.session.destroy();
        req.session.destroy(function(err) {
            if (err) throw err;
            console.log('successfully CLEARED SESSION');
        });
        console.log('req.session after destroy =>'.yellow, req.session);
    }











//---- EOF
}




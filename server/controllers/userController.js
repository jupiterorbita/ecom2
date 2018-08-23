// require("../../server.js")
// var mysql = require("mysql");
// connection = mysql.);
console.log('SERVER > userController'.blue);
const bcrypt = require('bcrypt');


module.exports = {

    // =========== CREATE new user ===========
    newUser: (req, res) => {
        console.log('>>> USER CONTROLLER >>> newUser');
        console.log("Connected!");
        console.log("MySQL connected as id ".yellow + connection.threadId)

        // check if email aready exits
        var sql_email = `SELECT email FROM users WHERE email='${req.body.email}' LIMIT 1;`;
        connection.query(sql_email, function (err, email_exists_result) {
            if (err) throw err;
            console.log('email exists result', email_exists_result);
            // if email exists STOP
            if (email_exists_result.length > 0 ) {
                console.log('EMAIL ALREADY IN DB - STOP REG');
                res.json({
                    message: 'cannot continue, email aready in DB',
                    success: false
                });
            } else {
                // IF indeed new user then continue
                console.log(`nothing found in DB while lookin for email "${req.body.email}" continue to register`);

                bcrypt.hash(req.body.pass, 10, function(err, pw_hash) {
                    console.log('PASS HASH =>', pw_hash);
                
                    var sql = `INSERT INTO UserSQL_DB.users (fname, lname, email, pass, created_at, updated_at, admin) VALUES ('${req.body.fname}', '${req.body.lname}', '${req.body.email}', '${pw_hash}', NOW(), NOW(), '0');`;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + ' record(s) created');
                        res.json({
                            message: 'successful register', 
                            success: true
                        });
                    });
                });

            }
        });


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
        console.log("MySQL connected as id ".yellow + connection.threadId)
        var sql = `SELECT email, id, fname, admin FROM users WHERE email='${req.body.email}' LIMIT 1;`
        connection.query(sql, function(err, result) {
            if (err) throw err;
            // console.log('======= RESULT ====>'.bgRed.black, result);
            // console.log(result.length);
            if (result.length > 0) {

                // check if email exitst
                if (result[0]['email'] === req.body.email) {
                    // console.log('email is valid and in DB'.red);

                    // grab the pass using the same email that is now valid
                    var sql2 = `SELECT pass FROM users WHERE email='${req.body.email}' LIMIT 1;`
                    connection.query(sql2, function(err, result2) {
                        if (err) throw err;
                        // console.log('PASS SQL RESULT =>'.bgBlue, result2);

                        // compaire pass 
                        bcrypt.compare(req.body.pass, result2[0]['pass'], function(err, pw_result) {
                            if (err) throw err;
                            // console.log('BCRYPT PW RESULT ====>'.bgYellow.black, pw_result);

                            if (pw_result === true) {

                                //check if admin & store in session
                                if (result[0].admin === 1) {
                                    // console.log('this user is an admin!');
                                    // console.log('result[0].admin', result[0].admin);
                                    // console.log('result[0].id', result[0].id);
                                    req.session.userid = result[0].id;
                                    req.session.fname = result[0].fname;
                                    // console.log('req.session.userid', req.session.userid);
                                    res.json({
                                        message: 'SUCCESS email & pass match',
                                        canLogin: true,
                                        powerLevel: 9999,
                                        fname: result[0].fname
                                    });
                                } 
                                // if not admin just store in session
                                else if (result[0].admin != 1) {
                                    console.log('this is not an admin!');
                                    req.session.userid = result[0].id;
                                    res.json({
                                        message: 'SUCCESS email & pass match',
                                        canLogin: true,
                                        powerLevel: 0,
                                        fname: result[0].fname
                                    });
                                }

                                
                            } else { 
                                // if pass doen't match DO NOT PROCEED
                                console.log('pass dontt match, send back json NO-GO');
                                res.json({
                                    message: 'ERROR - cannot login code:2',
                                    canLogin: false,
                                    powerLevel: -1
                                });
                            }
                        })

                    })

                }    

            } else { 
                console.log('email doesnt exit return ERR'.red);
                res.json({
                    messsage: 'error loging in code:1',
                    canLogin: false,
                    powerLevel: -1
                });
            }
        })



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


// =========== MAKE ADMIN ===============
    makeAdmin: (req, res) => {
        console.log('inside > SERVER > makeAdmin > USER CONTROLLER'.yellow);
        console.log('MAKING AN ADMIN => session + admin rights for DEMO');
        req.session.userid = 1; // make admin with db record of id 1 which is an admin
        res.json({
            message: 'SUCCESS made admin using default id=1',
            canLogin: true,
            powerLevel: 9999
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
            res.json({msg: 'ok'});
        });
        console.log('req.session after destroy =>'.yellow, req.session);
    }











//---- EOF
}




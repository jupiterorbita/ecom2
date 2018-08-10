console.log("SERVER > sql.js".blue);

//=========== MYSQL CONNECTION ===========
var mysql = require("mysql");
// connect to mySQL
connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: 'UserSQL_DB'
});
// console.log("MySQL connected as id ".yellow + connection.threadId);

// ======= actually connect ==========
// connection.connect(function(err) {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }
// console.log("MySQL connected as id ".yellow + connection.threadId);
// });
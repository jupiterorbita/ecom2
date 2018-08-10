var path = require('path');
var colors = require("colors"); // npm install colors https://www.npmjs.com/package/colors


//========== EXPRESS ==============
const express = require('express');
const app = express();


//========== BODY PARSER ==============
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Session
var session = require('express-session')
app.use(session({
    secret: 'encryption key',
    resave: false,
    saveUninitialized: true
}))

// SQL
require('./server/config/sql.js');


// ============ Routes ============

//======== ANGULAR ROUTE ========
app.use(express.static( __dirname + '/public/dist/public' ));

require('./server/config/routes')(app);
    // // widlcard for angular
    // app.all("*", (req,res,next) => {
    //     res.sendFile(path.resolve("./public/dist/public/index.html"))
    // });

// =========== SERVER CONNECTION ============
// var server = app.listen(5000)
// console.log('SERVER connected port:'.yellow, server);

app.listen(5000, function () {
    console.log("SERVER connected port:5000".yellow);
})

// ------------------ END ------------------
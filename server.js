var path = require('path');
var colors = require("colors"); // npm install colors https://www.npmjs.com/package/colors


const bcrypt = require('bcrypt');

//========== EXPRESS ==============
const express = require('express');
const app = express();



// =========== SERVER CONNECTION ============
// var server = app.listen(5000)
// console.log('SERVER connected port:'.yellow, server);
const portNum = '5000';
app.listen(portNum, function () {
    console.log("SERVER connected port:5000".yellow);
})



// ------------------------ SOCKET -------------------
// =========== SOCKET.io ============

// require('./server/config/socket.io.js');

// const io = require('socket.io').listen(5000);

// var counter = 0;

// io.on('connection', function(socket) {

//     socket.emit('greetings', { msg: 'greetings from socket.io.js'});
//     socket.on('thankyou', function (data) {
//         console.log('data =>', data);
        
//     });
// });








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


// ------------------ END ------------------
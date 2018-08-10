// var users = require('../controllers/users.js');
// const ctrl = require("./../controllers/userController.js");
const ctrl = require("./../controllers/userController.js");

console.log("SERVER > routes.js".blue);

module.exports = function(app) {


    // Create new user
    app.post("/api/new_user", ctrl.newUser);


}
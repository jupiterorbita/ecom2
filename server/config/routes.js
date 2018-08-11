// var users = require('../controllers/users.js');
// const ctrl = require("./../controllers/userController.js");
const ctrl = require("./../controllers/userController.js");

console.log("SERVER > routes.js".blue);

module.exports = function(app) {

//======= REGISTER routes ===========
    // Create new user
    app.post("/api/new_user", ctrl.newUser);

    // fetch all users
    app.get("/api/fetchAll", ctrl.getUsers);


// ======== Login route ============
    // check user 
    app.post("/api/checkUser", ctrl.checkUser);
}
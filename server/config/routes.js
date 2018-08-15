// var users = require('../controllers/users.js');
// const ctrl = require("./../controllers/userController.js");
const ctrl = require("./../controllers/userController.js");
const prodCtrl = require("./../controllers/productController.js")

console.log(">> SERVER > routes.js".blue);

module.exports = function(app) {

//======= REGISTER routes ===========
    // Create new user
    app.post("/api/new_user", ctrl.newUser);

    // fetch all users
    app.get("/api/fetchAll", ctrl.getUsers);


// ======== Login route ============
    // check user 
    app.post("/api/checkUser", ctrl.checkUser);


// ======= CHECK SESSION =========
    app.get("/api/checkSession", ctrl.checkSession);


// ======= DESTROY SESSION ========
    app.get("/api/destroySession", ctrl.destroySession);

//========= CHECK if ADMIN ========
    app.get("/api/checkIfAdmin", ctrl.checkIfAdmin);



//================ PRODUCT ROUTES =================

// create new product
    app.post("/api/product/create", prodCtrl.createProduct);
// fetch aLL - get inventory
    app.get("/api/product/getInventory", prodCtrl.getInventory);



    // ************* ordering *************-
    // --------- id asc ------------
    app.get("/api/product/id_asc", prodCtrl.id_asc);

    // --------- id desc -----------
    app.get("/api/product/id_desc", prodCtrl.id_desc);
    
    // --------- price asc --------
    app.get("/api/product/price_asc", prodCtrl.price_asc);
    // -------- price desc -------
    app.get("/api/product/price_desc", prodCtrl.price_desc);



    // --------- name asc ------------
    app.get("/api/product/name_asc", prodCtrl.name_asc);



} // -- EOF
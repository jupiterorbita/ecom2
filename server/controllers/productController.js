console.log(">> SERVER > productController.js".blue);


module.exports = {

    // ============= create NEW product ============
    createProduct: (req, res) => {
        console.log('>> SERVER > productController.js > createProduct'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        var sql = `INSERT INTO products (product_name, product_price, sku, product_description, qty, img, color, created_at, updated_at) VALUES ('${req.body.product_name}', '${req.body.product_price}', '${req.body.sku}', '${req.body.product_description}', '${req.body.qty}', '${req.body.img}', '${req.body.color}', NOW(), NOW() );`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result.affectedRows + ' record(s) created');
            console.log('what is fields? =>', fields);
            res.json({message: "SUCCESS created new product", success: true});
            });
    },

    // ========== FETCH ALL - GET inventory ===========
    getInventory: (req, res) => {
        console.log('>> SERVER > productController.js > getInventory'.blue);
        console.log("MySQL connected as id ".yellow + connection.threadId);
        var sql = `SELECT * FROM UserSQL_DB.products;`;
        connection.query(sql, function(err, sql_result, fields) {
            if (err) throw err;
            console.log(sql_result);
            res.json({sql_result: sql_result});
        })
    },





    //***************  ORDERING *******************
    //----------- id ascending ----------
    id_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY id;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID ASC", order_results: results});
        });
    },
    //----------- id descending ----------
    id_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY id DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID DESC", order_results: results});
        });
    },


    //----------- price ascending ----------
    price_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_price;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            console.log(results);
            res.json({message: "success retreiving all data ORDER BY price ASC", order_results: results});
        });
    },
    //----------- price desc --------------
    price_desc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_price DESC;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            console.log(results);
            res.json({message: "success retreiving all data ORDER BY price DESC", order_results: results});
        });
    },



    //----------- name ascending ----------
    name_asc: (req, res) => {
        var sql = "SELECT * FROM UserSQL_DB.products ORDER BY product_name;"
        connection.query(sql, function(err, results, fields) {
        if (err) throw err;
            console.log(results);
            res.json({message: "success retreiving all data ORDER BY ID ASC", order_results: results});
        });
    },







}

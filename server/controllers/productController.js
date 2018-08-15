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

    }



















}

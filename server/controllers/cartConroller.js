console.log(">> SERVER > cartController.js".blue);

module.exports = {


// ================================================================
// ======================= DATA CART SESSION ======================
// ================================================================

// ------------ Add Cart Item To Session -----------------
updateCartItemToSession: (req, res) => {
    var arr_id = [];
    var sql_string_id = '';
    console.log('addCartItemToSession res.body=>\n', req.body);
    console.log('FIRST >>> req.session.cart =', req.session['cart']);
    console.log('req.seesion', req.session);
// ------------------------

  

            for (var idx = 0; idx < req.body['cart'].length; idx++) {
                console.log(req.body['cart'][idx]);
                console.log('id =>', req.body['cart'][idx]['id']);
    
                arr_id.push(req.body['cart'][idx]['id']);
    
                if (arr_id.length === 1) {
                    sql_string_id += (req.body['cart'][idx]['id']);
                }
                else if (arr_id.length > 1) {
                    sql_string_id += (', ' + (req.body['cart'][idx]['id']));
                }
    
                // console.log('id is =>', req.body[idx]['id'], 'qty is =>', req.body[idx].qty);
            }
    
    
            
            console.log('string_id ===>'.yellow, arr_id);
            console.log('string ===>'.bgCyan, sql_string_id);
            req.session.sql_string_id = sql_string_id;
            req.session['cart'] = req.body['cart'];
            console.log('NEW req.session.cart =>', req.session['cart']);
            // console.log('SERVER RESPONSE --->', res)
            res.json({message: 'saved to session'});



},


// -------- Remove Item From Cart Session -----------
removeItemFromCartSession: (req, res) => {
    console.log('productController > removeItemFromCartSession'.blue);
    console.log('id to remove => req.params.cartItemId => '.yellow, req.params.cartItemId);
    console.log('id to remove => req.params'.yellow, req.params)
    console.log('CART before remove Id -> req.session.cart =>'.bgGreen.black, req.session.cart);

    if (req.session.cart) {
        console.log('cart is true procceed to filter and return id...')

        // filter out that one id and return the cart obj without it
        req.session.cart = req.session.cart.filter(removeid => removeid.id != req.params.cartItemId);
        console.log('CART *** AFTER *** remove Id -> req.session.cart => '.bgGreen.black, req.session.cart);
        
        res.json({msg: 'removed the id', updatedCart: req.session.cart})
    }
},



// ------------ Get All Cart Items ------------------
getAllCartItems: (req, res) => {
    console.log('productController > getAllCartItems'.yellow);
    var totalItemPrice = 0;
    var totalItemsBack = [];
    var finalCartTotal = 0;
    // req.session.string_id
    // console.log('req.session =>', req.session);
    console.log('getAllCartItems >> req.session["cart"] =>', req.session['cart']);

    if (!req.session['cart']) {
        res.json({message: 'nothing in cart'});
    }
    // if cart has something in get items
    else if (req.session['cart']) {

        var sql = `SELECT id, product_name, product_price, img FROM UserSQL_DB.products WHERE id in (${req.session.sql_string_id});`
        connection.query(sql, function(err, results_arr, fields) {
        if (err) throw err;
        console.log('results_arr'.green, results_arr);

            // ****** calculate price of each product ******
            for (var idx = 0; idx < results_arr.length; idx++) {
                // console.log('results_arr["idx"] =>'.green, results_arr[idx])
                console.log(`cart id: ${results_arr[idx]['id']}, has price $ ${results_arr[idx]['product_price']}`); 
                
                // loop through the req.body.cart obj to find same id and multiply with price
                for (var i = 0; i < req.session['cart'].length; i++) {
                    if (req.session['cart'][i].id === results_arr[idx].id) {
                        console.log('SAME!!! => req.session["cart"][i].id === results_arr[idx].id', req.session['cart'][i].id, results_arr[idx].id);
                        totalItemPrice = (req.session['cart'][i].qty * results_arr[idx].product_price);

                        // calc final total cart price
                        finalCartTotal += totalItemPrice;

                        totalItemsBack.push({
                            id: results_arr[idx].id,
                            product_name: results_arr[idx].product_name,
                            item_price:results_arr[idx].product_price, 
                            qty: req.session['cart'][i].qty, 
                            total_price: totalItemPrice
                        });

                        console.log(
                            `
                            in cart 🏠\n
                            ------------
                            itemID: ${results_arr[idx].id} has QTY: ${req.session['cart'][i].qty} X $${results_arr[idx].product_price} = 💵 $${totalItemPrice} 
                            -----------
                            `
                        );
                    }
                }


            }
            console.log('-----\n - totalItemsBack - \n', totalItemsBack);
            console.log('=====>finalCartTotal'.blue, finalCartTotal);

            res.json({message: "found items", results: results_arr, totalItemsBack: totalItemsBack, finalCartTotal: finalCartTotal});
        });
    }

},

clearCartSession: (req, res) => {
    console.log('>>>>> req.session["cart"] >>>'.green, req.session['cart']);
    req.session['cart'] = null;
    console.log('>>>>> req.session["cart"] >>>'.yellow, req.session['cart']);

    res.json({msg: 'something test'})
}


























}
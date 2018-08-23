// function to remove item from cart

console.log('RemoveAt');
// var cart = [{id:1, qty:10}, {id:2, qty:14}, {id:44, qty:5}, {id:12, qty:55}];
// var cart = [{id:1, qty:10}]
var cart = [ { id: 13, qty: 4 }, { id: 14, qty: 1 } ]

console.log('original cart =>', cart);

// function removeAt(id, cart){
//     var toreturn;
//     var temp;
    
//     for (var idx = 0; idx < cart.length; idx++) {

//         if (cart[idx].id === id) {

//                 // console.log('found id at idx =>', idx);
//                 toreturn = idx;
            
//                 if (!cart[idx+1]) {
//                     // console.log(cart.pop());
//                     // console.log('cart is now =>', cart);
//                     return cart;
                    
//                 }
//                     temp = cart[idx];
//                     cart[idx] = cart[idx+1];
//                     cart[idx+1] = temp;
//             // console.log('cart now => ', cart);
//             // return cart;
//         }
//     }
// }


function removeAt(id, cart_arr) {
    for (var i =0; i < cart_arr.length; i++){
        if (cart_arr[i].id === id) {
            cart_arr.splice(i,1);
            console.log(`after function removes id=${id}`, cart_arr);
            return cart_arr;
        }
    }
}


removeAt(13, cart);








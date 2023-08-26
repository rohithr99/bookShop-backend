
//import model
const database = require('./db')

//register logic
register = (username,email, phone, passwd) => {
    return database.User.findOne({ phone }).then(user => {
        if (user) {
            return {
                message: "user already exists",
                status: false,
                statusCode: 404
            }
        }
        else {
            newUser = new database.User({
                username: username,
                email: email,
                phone: phone,
                passwd: passwd,
                cart:[]
            })

            // to reflect the changes made by the server in database

            newUser.save();

            return {
                message:"registered successfully",
                status: true,
                statusCode: 200
            }
        }
    })
}

//login logic
login = (username,passwd) => {
    return database.User.findOne({username,passwd}).then(user => {
        if(user){
            return {
                message:"login success",
                status: true,
                statusCode: 200,
                currentUser: user.username,
                currentPhone: user.phone,
                currentEmail: user.email
            } 
        }
        else{
            return {
                message: "incorrect username or password",
                status: false,
                statusCode: 404
            }
        }
    })
}


//add to cart logic
addToCart = (sl,phone,image,name,price) =>{
    return database.User.findOne({phone}).then(user => {
        if(user){
            user.cart.push({sl,image,name,price});
            user.save();
            
            return {
                message:"added to cart",
                status: true,
                statusCode: 200
            }
        }else{
            return {
                message: "no user found",
                status: false,
                statusCode: 404
            }
        }
    })
}

//display cart data
getCartDetails = (phone) => {
    return database.User.findOne({phone}).then(user => {
        if(user){
            return {
                message:user.cart,
                status: true,
                statusCode: 200
            }
        }else{
            return {
                message: "no user found",
                status: false,
                statusCode: 404
            }
        }
    })
}

//delete a cart item
// deleteCartItem = (sl) => {
//     return database.User.findOne({ "cart.sl" : sl}).then(user => {
//         if(user){ 
//             for( var i = 0; i < user.cart.length; i++){ 
    
//                 if ( user.cart[i].sl === sl) { 
            
//                     user.cart[i].splice(i, 1); 
//                 }
            
//             }    

//             user.save();
            
//             return {
//                 message:"updated",
//                 status: true,
//                 statusCode: 200
//             }
//         }else{
//             return {
//                 message: "no user found",
//                 status: false,
//                 statusCode: 404
//             }
//         }
//     })

// }


// deleteCartItem = (sl) => {
//     return database.User.findByIdAndUpdate( { "cart.sl" : sl }, { 
//         $pull: { 
//             cart : {
//             sl: sl
//         }
//         }
        
//       },
//       {
//         new: true
//     },
//     (err, doc) => {
//         if (err) {
//             console.log("Something wrong when updating data!");
//         }
    
//         console.log(doc);
//     } 
//       )
// }

deleteCartItem = (sl) => {
    return database.User.update({ "cart.sl": sl }, { "$pull": { "cart": { "sl": sl } }}, { safe: true, multi:true }, function(err, obj) {
        //do something smart
    });
}


module.exports = {
    register,login, addToCart, getCartDetails , deleteCartItem
}
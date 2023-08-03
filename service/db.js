//import mongoose
 const mongoose = require("mongoose");

 //connect
 mongoose.connect('mongodb://127.0.0.1:27017/bookshop')

 //model for collection Users
const User = mongoose.model('User',{
    username : String,
    email : String,
    phone : Number,
    passwd : String,
    cart : []
})


//model for add to cart


//export model
module.exports = {
    User
}
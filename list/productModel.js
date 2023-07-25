//import mongoose
const mongoose = require("mongoose");

//connect
mongoose.connect('mongodb://127.0.0.1:27017/bookshop')

//model for collection Users
const Product = mongoose.model('Product',{
   sl : Number,
   name : String,
   category : String,
   description : String,
   price: Number,
   image: String,
   isAvailable: Boolean,
    rating: Number,
    author: String,
    publisher: String,
    language: String,
    published: String
})

//export model
module.exports = {
   Product
}
//import express
const express = require('express');

//import logic file
const logic = require('./service/logic');

//import products logic
const productLogic = require('./list/productLogic');

//import cors
const cors = require('cors');

//server creation
const server = express();

//incoming json type data convert to js
//json method inside express
server.use(express.json())

//connecting front-end
server.use(cors({origin:'http://localhost:4200'}))

//set port 
server.listen(8000,() => {
    console.log("server started");
})

//register -- post 
server.post('/qMart/register',(req,res) => {
    logic.register(req.body.username,req.body.email,req.body.phone,req.body.passwd).then(result => {
        res.status(result.statusCode).json(result)
        //json method converts js to json and also sending the data
        //json method inside javascript
    })
})

//login -- post
server.post('/qMart',(req,res) => {
    logic.login(req.body.username,req.body.passwd).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//getAllProducts
server.get('/qMart/products',(req,res) => {
    productLogic.getAllProducts().then(result => {
        res.status(result.statusCode).json(result)
    })
})

//get details of a single product
server.get('/qMart/products/:sl',(req,res) => {
    productLogic.getProduct(req.params.sl).then(result => {
        res.status(result.statusCode).json(result);
    })
})
//products logic file

//import model
const allProducts = require('./productModel');

//all product view logic

getAllProducts = () => {
    return allProducts.Product.find({}).then(result => {
        if(result){
            return {
                message : result,
                status : true,
                statusCode: 200
            }
        }else{
            return {
                message:"no products found in backend",
                status: false,
                statusCode: 404
            }
        }
    })
}

//single product logic
getProduct = (id) => {
    return allProducts.Product.findOne({id: id}).then(item => {
        if(item){
            return {
                message: "product loaded successfully",
                status: true,
                statusCode: 200,
                data: item
            }
        }
        else{
            return {
                message:"no product found",
                status: false,
                statusCode: 404
            }

        }
    })
}


module.exports = {
    getAllProducts,getProduct
}


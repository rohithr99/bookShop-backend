
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
                passwd: passwd
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


//view all products


module.exports = {
    register,login
}
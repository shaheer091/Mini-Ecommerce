const user = require('../models/user')
// const bcrypt = require('bcrypt')

//get request
const signup = (req, res) => {
    res.render('signup')
}
const login = (req, res) => {
    res.render('login')
}
const home = (req, res) => {
    res.render('home')
}
const profile = (req, res) => {
    res.render('profile')
}
const products = (req, res) => {
    res.render('products')
}



//post request
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "please provide valid details" })
        }else{
            const newUser = new user({
                username,
                email,
                password
            })
            await newUser.save()
            res.redirect('/home')
        }
    } catch (error) {
        console.log(error);
    }

}


const loginedUser = (req, res) => {
    res.redirect('/home')
}


module.exports = {
    signup,
    login,
    home,
    profile,
    products,
    createUser,
    loginedUser
}
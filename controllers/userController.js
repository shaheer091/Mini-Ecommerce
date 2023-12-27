const users = require("../models/user");
const bcrypt = require("bcrypt");
const productList = require('../models/products')

//get request
const signup = (req, res) => {
    res.render("common/signup");
};

const login = (req, res) => {
    res.render("common/login", { message: req?.session?.message });
};

const home = (req, res) => {
    res.render("user/home");
};

const profile = (req, res) => {
    res.render("user/profile");
};

const products = async (req, res) => {
    try {
        const productDetails = await productList.find()
        console.log(productDetails);
        res.render("user/products", { products: productDetails })
    } catch (error) {
        console.log(error);
    }
};

//post request
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res.redirect("signup");
        }
        const existingUser = await users.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            res.redirect('login?alert=User already exist')
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            req.session.user = email;
            res.redirect("/home");
        }

    } catch (error) {
        console.log(error);
    }
};

const loginedUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            req.session.message = "enter email and password";
            return res.redirect("/login");
        }
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            req.session.message = "No user exist";
            return res.redirect("/login");
        }
        const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordMatch) {
            req.session.message = "password didnt match";
            return res.redirect("/login");
        }
        req.session.user = email;

        if (existingUser.userType == "admin") {
            req.session.isAdmin = true;
            res.redirect("/adminHome");
        } else {
            req.session.isAdmin = false;
            res.redirect("/home");
        }
    } catch (error) {
        console.log(error);
    }
};

const logout = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect("/login");
            }
        });
    } catch (error) {
        console.log(error);
    }
};

// const updateDetails = async (req, res) => {
//     try {
//         const { fullname, gender, place } = req.body

//     }
// }



module.exports = {
    signup,
    login,
    home,
    profile,
    products,
    createUser,
    loginedUser,
    logout,

};

const users = require("../models/user");
const bcrypt = require("bcrypt");
const productList = require('../models/products')
const userDetailsModel = require('../models/userDetails')

const { default: mongoose } = require('mongoose')


//get request
const signup = (req, res) => {
    if (req.session.user) {
        res.redirect('/home')
    } else {
        res.render("common/signup");
    }
};

const login = (req, res) => {
    if (req.session.user) {
        if (req.session.isAdmin) res.redirect('/adminHome')
        else res.redirect('/home')
    } else {
        res.render("common/login", { message: req?.session?.message });
    }
};

const home = (req, res) => {
    if (req.session.user) {
        console.log('req.session.userId', req.session.userId);
        res.render("user/home");
    } else {
        res.redirect('/login')
    }
};

const profile = async (req, res) => {
    if (req.session.user) {
        const userId = req.session.userId
        console.log('userId', userId)
        // const user = await users.findOne({ email })
        const allData = await users.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(userId) } }, { $lookup: { from: "userdetails", localField: "_id", foreignField: "userID", as: "fullDetails" } }])
        console.log(allData);
        res.render("user/profile", { allData });
    } else {
        res.redirect('/login')
    }
};

const products = async (req, res) => {
    if (req.session.user) {
        try {
            const productDetails = await productList.find()
            console.log(productDetails);
            res.render("user/products", { products: productDetails })
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect('/login')
    }
};

//post request
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            console.log('first');
            res.redirect("/signup");
        }
        const existingUser = await users.findOne({
            $or: [{ username }, { email }],
        });

        if (existingUser) {
            console.log('second');
            res.redirect('/login?alert=User already exist')
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({
                username,
                email,
                password: hashedPassword,
            });
            req.session.userId = newUser._id;
            req.session.user = 'shaheer'
            console.log(newUser);
            console.log(req.session.userId);
            await newUser.save();
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
            req.session.userId = existingUser._id
            res.redirect("/home");
        }

    } catch (error) {
        console.log(error);
    }
};

const addDetails = async (req, res) => {
    try {
        const used = req.session.userId
        const { username, email, fullname, age, gender, phonenumber, address } = req.body
        console.log(username);
        console.log("------------------------------------------");
        console.log(req.body);
        console.log("------------------------------------------");


        console.log('used----', used);
        await userDetailsModel.updateOne(
            { userID: used },
            {
                fullName: fullname,
                gender: gender,
                age: age,
                phoneNumber: phonenumber,
                address: address,
                userID: used
            },
            { upsert: true })
        res.redirect('/home')
    } catch (err) {
        console.log(err);
    }
}

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


module.exports = {
    signup,
    login,
    home,
    profile,
    products,
    createUser,
    loginedUser,
    logout,
    addDetails
};

const user = require("../models/user");
const products = require('../models/products')


const adminHome = (req, res) => {
    if (req.session.user && req.session.isAdmin) {
        res.render("adminHome");
    } else {
        res.redirect("/login");
    }
};

const usersList = async (req, res) => {
    try {
        const users = await user.aggregate([
            { $match: { userType: 'user' } }
        ])
        res.render('usersList', { users })
    } catch (error) {
        console.log(error);
        res.redirect('/')
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


const adminProducts = (req, res) => {
    res.render('adminProducts')
}

const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        if (user.UserType == 'admin') {
            res.redirect('/admin/users');
            req.flash('error', 'Admin user cannot be deleted');
        } else {
            await user.findByIdAndDelete(userId);
            res.redirect('/admin/users');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/adminHome');
    }
};

const addProducts = async (req, res) => {
    try {
        const { name, description, price } = req.body
        const imagePath = req.file.path

        if (!name || !description || !price) {
            res.redirect('/admin/products')
        }
        if (!req.file) {
            res.send('select image')
        }
        else {
            const newProduct = new products({
                imagePath: imagePath,
                productName: name,
                productDescription: description,
                productPrice: price
            })
            await newProduct.save()
            res.redirect('/admin/products')
        }
    } catch (err) {
        console.log(err);
    }

}


module.exports = {
    adminHome,
    usersList,
    logout,
    deleteUser,
    adminProducts,
    addProducts
};

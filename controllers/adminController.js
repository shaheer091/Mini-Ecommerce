const user = require("../models/user");
const products = require('../models/products')


const adminHome = (req, res) => {
    if (req.session.user && req.session.isAdmin) {
        res.render("admin/adminHome");
    } else {
        res.redirect("/login");
    }
};

const usersList = async (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        try {
            const users = await user.aggregate([
                { $match: { userType: 'user' } }
            ])
            res.render('admin/usersList', { users })
        } catch (error) {
            console.log(error);
            res.redirect('/')
        }
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


const adminProducts = async (req, res) => {

    if (req.session.user) {
        res.render('admin/adminAddProducts')
    } else {
        res.redirect('/login')
    }
}

const seeProducts = async (req, res) => {
    const seeAllProducts = await products.find({})
    // console.log(seeAllProducts);
    res.render('admin/adminSeeProducts', { seeAllProducts })
}



const deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        if (user.userType == 'admin') {
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
            res.redirect('/admin/seeProducts')
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
            res.redirect('/admin/seeProducts')
        }
    } catch (err) {
        console.log(err);
    }

}

const editProducts = async (req, res) => {
    const productId = req.params.id
    // console.log(productId);
    const findProduct = await products.findById(productId)
    res.render('admin/adminEditProducts', { findProduct })
}



const updateProducts = async (req, res) => {
    const productId = req.params.id
    const { productName, productDescription, productPrice } = req.body
    console.log(productName, productDescription, productPrice);
    console.log(req.body);
    try {
        if (!req.file) {
            return res.status(400).send('no image added')
        }
        const imagePath = req.file.path
        await products.updateOne({ _id: productId }, { $set: { imagePath, productName: productName, productDescription: productDescription, productPrice: productPrice } })
        res.redirect('/admin/seeProducts')
    } catch (err) {
        console.log(err);
    }

}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    await products.findByIdAndDelete(productId)
    res.redirect('/admin/seeProducts')
}


module.exports = {
    adminHome,
    usersList,
    logout,
    deleteUser,
    adminProducts,
    addProducts,
    seeProducts,
    editProducts,
    updateProducts,
    deleteProduct
};

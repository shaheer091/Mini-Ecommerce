const signup = (req, res) => {
    res.render('signup')
}
const login = (req, res) => {
    res.render('login')
}
const home = (req, res) => {
    res.render('home')
}
const profile=(req,res)=>{
    res.render('profile')
}
const products=(req,res)=>{
    res.render('products')
}



module.exports = {
    signup,
    login,
    home,
    profile,
    products
}
const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.signup)
router.get('/login', mainController.login)
router.get('/home', mainController.home)
router.get('/profile', mainController.profile)
router.get('/products', mainController.products)


router.post('/signup',mainController.createUser)
router.post('/login',mainController.loginedUser)



module.exports = router
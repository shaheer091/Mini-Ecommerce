const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')

router.get('/', mainController.signup)
router.get('/login', mainController.login)
router.get('/home', mainController.home)
router.get('/profile',mainController.profile)
router.get('/products',mainController.products)




module.exports = router
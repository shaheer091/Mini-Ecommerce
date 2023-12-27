const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validUserInput = require('../middleware/backendSignup')
const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/', userController.signup)
router.get('/login', userController.login)
router.get('/home', isAuthenticated, userController.home)
router.get('/profile', userController.profile)
router.get('/products', userController.products)
router.get('/logout', userController.logout)



router.post('/signup', validUserInput, userController.createUser)
router.post('/login', userController.loginedUser)



module.exports = router

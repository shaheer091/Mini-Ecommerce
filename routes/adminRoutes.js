const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const upload=require('../models/multer')


router.get('/adminHome', adminController.adminHome)
router.get('/admin/users',adminController.usersList)
router.get('/logout',adminController.logout)
router.get('/admin/addProducts',adminController.adminProducts)
router.get('/admin/seeProducts',adminController.seeProducts)
router.get('/admin/adminEditProducts/:id',adminController.editProducts)
router.get('/admin/deleteProduct/:id',adminController.deleteProduct)



router.post('/admin/editted/:id',adminController.updateProducts)
router.post('/deleteUser', adminController.deleteUser);
router.post('/admin/products/add',upload.single('image'),adminController.addProducts)




module.exports = router

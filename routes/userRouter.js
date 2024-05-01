const express=require('express')
const router=express.Router()

const {register,login,dashboard}=require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.post('/register',register)
router.post('/login',login)
router.get('/dashboard',AuthMiddleware,dashboard)

module.exports=router;
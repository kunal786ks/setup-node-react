const express=require('express')
const {addUser,getUser,searchUser}=require('../controller/userController')
const {upload}=require('../config/multerService')
const { protect } = require('../middleware/authMiddleware')

const router=express.Router()

router.post('/signup',upload.single('pic'),addUser)
router.post('/login',getUser)
router.get('/',protect,searchUser)


module.exports=router
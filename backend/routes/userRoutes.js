const express = require('express')
const { registerUser, loginUser, getData, getUser, getmyinfo } = require('../controllers/userControllers')
const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/db').get(getData)
router.route('/getUser').post(getUser)
router.route('/getmyinfo').post(getmyinfo)


module.exports=router

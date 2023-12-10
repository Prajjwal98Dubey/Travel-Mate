const express = require('express')
const { registerUser, loginUser, getData, getUser, getmyinfo, editName, editPhoto } = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/db').get(getData)
router.route('/getUser').post(getUser)
router.route('/getmyinfo').post(getmyinfo)
router.route('/edit_name').put(protect,editName)
router.route('/changePhoto').put(editPhoto)

module.exports=router

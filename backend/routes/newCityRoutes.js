const express = require('express')
const { frequentVisitedCities } = require('../controllers/frequentCityControllers')
const router = express.Router()

router.route('/freq-city').get(frequentVisitedCities)

module.exports=router

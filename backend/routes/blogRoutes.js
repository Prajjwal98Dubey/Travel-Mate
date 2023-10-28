const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const { createPost, getBlogs, getTravellerBlog } = require('../controllers/blogController')

const blogRouter = express.Router()

blogRouter.route('/blog').post(protect,createPost)
blogRouter.route('/blog').get(protect,getBlogs)
blogRouter.route('/traveller').post(getTravellerBlog)

module.exports = blogRouter


const express = require('express')
const { protect } = require('../middlewares/authMiddleware')
const { createPost, getBlogs, getTravellerBlog, blogEdit, blogDelete } = require('../controllers/blogController')

const blogRouter = express.Router()

blogRouter.route('/blog').post(protect,createPost)
blogRouter.route('/blog').get(protect,getBlogs)
blogRouter.route('/traveller').post(getTravellerBlog)
blogRouter.route('/blog_edit/:id').put(protect,blogEdit)
blogRouter.route('/blog_delete/:id').delete(protect,blogDelete)

module.exports = blogRouter


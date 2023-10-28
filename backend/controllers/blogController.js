const Blog = require("../models/blogModel")
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const createPost = async (req, res) => {
    const { title, description } = req.body
    let token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userID = decoded.id
    const blog = await Blog.create({
        title: title,
        description: description,
        user: userID
    })
    res.status(200).send(blog)
}

const getBlogs = async (req, res) => {
    let token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const userID = decoded.id
    const user = await Blog.find({ user: userID })
    res.status(200).send(user)
}

const getTravellerBlog = async (req, res) => {
    const { email } = req.body
    const user = await User.find({ email: email })
    const userId = user[0]._id
    const blogs = await Blog.find({ user: userId })
    res.status(200).send(blogs)

}

module.exports = { createPost, getBlogs, getTravellerBlog }
const { generateToken } = require('../config/authToken')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const registerUser = async (req, res) => {
    const { name, email, password } = req.body
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
        res.send("Email Already Exists")
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const userPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name:name,
            email:email,
            password:userPassword
        })
        user.save()
        res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                password:userPassword,
                token:generateToken(user._id)
        })
    }

}
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const emailExists = await User.findOne({ email: email })
    if (!emailExists) {
        res.send("User does not exists.")
    }
    if (emailExists) {
        if (await bcrypt.compare(password, emailExists.password)) {
            res.status(200).send({
                token:generateToken(emailExists._id),
                email:email
            })
        }
        else {
            res.send("Invalid Credentials.")
        }
    }

}

module.exports = { registerUser, loginUser }
const { generateToken } = require('../config/authToken')
const cloudinary = require('../config/cloudinary')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const citiesAnalytics = require('../models/cityAnalyticsModel')
const registerUser = async (req, res) => {
    const { name, email, password, topCities, photo } = req.body
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
        res.send("Email Already Exists")
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const userPassword = await bcrypt.hash(password, salt)
        try {
                const uploadRes = photo ? await cloudinary.uploader.upload(photo, {
                    upload_preset: 'travel_mate'
                }) : "https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            
            const user = await User.create({
                name: name,
                email: email,
                password: userPassword,
                topCities: [topCities[0].toLowerCase(), topCities[1].toLowerCase(), topCities[2].toLowerCase()],
                photo: uploadRes 
            })
            user.save()
            for (let i= 0 ;i <topCities.length ;i++){
                const checkCity = await citiesAnalytics.findOne({cityName:topCities[i]})
                if (checkCity){
                    checkCity.occurence+=1
                    checkCity.save()
                    
                }
                else{
                    const newCity = await citiesAnalytics.create({
                        cityName:topCities[i]
                    })
                    newCity.save()
                }

            }
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: userPassword,
                topCities: user.topCities,
                photo: user.photo,
                token: generateToken(user._id)
            })




        }
        catch (error) {

            res.status(500).send(error)
        }

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
                token: generateToken(emailExists._id),
                email: email,
                topCities: emailExists.topCities
            })
        }
        else {
            res.send("Invalid Credentials.")
        }
    }

}

const getSenderUserId = async(req,res)=>{
    const sEmail = req.query.sEmail;
    const senderData = await User.findOne({email:sEmail});
    res.json({sender:senderData._id})
}

const getData = async (req, res) => {
    const userData = await User.find()
    res.status(200).send(userData)
}
const getUser = async (req, res) => {
    const { email } = req.body
    const getRequiredUser = await User.find({ email: email })
    res.status(200).send(getRequiredUser)
}
const getmyinfo = async (req, res) => {
    const { email } = req.body
    const checkEmail = await User.find({ email: email })
    if (!checkEmail) {
        res.status(400).send("User does not exists.")
    }
    res.status(200).send(checkEmail)
}

const editName = async (req, res) => {
    const { email, updatedName } = req.body
    try {
        const user = await User.findOne({ email: email })
        user.name = updatedName
        await user.save()
        res.status(200).send(user)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}
const editPhoto = async (req, res) => {
    const { email, pic } = req.body
    const user = await User.findOne({ email: email })
    try {
        if (pic) {
            const uploadRes = await cloudinary.uploader.upload(pic, {
                upload_preset: 'travel_mate'
            })
            if (uploadRes) {
                user.photo = uploadRes
            }
        }
        await user.save()
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { registerUser, loginUser, getData, getUser, getmyinfo, editName, editPhoto ,getSenderUserId}
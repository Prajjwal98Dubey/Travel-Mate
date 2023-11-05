const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        topCities: [
            {
                type: String,
                required: true
            }
        ],
        photo:{
            type:Object,
            default:"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
        }
    }
)

module.exports = mongoose.model("User", userSchema)

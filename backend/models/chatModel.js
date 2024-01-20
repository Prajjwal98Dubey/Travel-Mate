const mongoose = require('mongoose')

const chatIdSchema = mongoose.Schema({
    people: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Chat', chatIdSchema)
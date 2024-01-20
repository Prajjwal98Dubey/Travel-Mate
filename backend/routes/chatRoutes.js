const express = require('express')
const { getNewChatId } = require('../controllers/chatControllers')

const chatRouter  = express.Router()

chatRouter.route('/create-id').post(getNewChatId)

module.exports = chatRouter

const express = require('express')
const { addMessage, getAllChats } = require('../controllers/messageControllers')

const messageRouter = express.Router()

messageRouter.route('/m/add-message').post(addMessage)
messageRouter.route('/m/chats').get(getAllChats)

module.exports = messageRouter
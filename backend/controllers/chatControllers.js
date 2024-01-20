const Chat = require('../models/chatModel')
// vir:srk
const getNewChatId = async (req, res) => {
    const { user1, user2 } = req.body
    console.log(user1 ,typeof(user1))
    console.log(user2 ,typeof(user2))
    let q1 = user1.substring(0, 3) +  user2.substring(0, 3)
    let q2 = user2.substring(0, 3) + user1.substring(0, 3)
    console.log("here before if ")
    if (await Chat.findOne({ people: q1 })) {
        console.log("here inside if ")
        res.status(200).json(await Chat.findOne({ people: q1 }))
        return
    }
    if (await Chat.findOne({ people: q2 })){
        console.log("here inside if ")
        res.status(200).json(await Chat.findOne({ people: q2 }))
        return
    }
    console.log("here after if ")
    const newUser = await Chat.create({
        people: user1.substring(0, 3) + user2.substring(0, 3)
    })
    newUser.save()
    res.status(200).json(newUser)

}

module.exports = { getNewChatId }
const app = require('express')()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const cors = require('cors')
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
let senderId = "";
let recieverId = "";
app.use(cors())
app.get('/s-r-info', async (req, res) => {
    console.log("API is being CALLED!!!")
    const sEmail = req.query.sEmail
    const rEmail = req.query.rEmail
    senderId = sEmail;
    recieverId = rEmail;
    let uniqueIdArray = [senderId, recieverId];
    uniqueIdArray.sort()
    let response = uniqueIdArray[0] + "-" + uniqueIdArray[1];
    res.json(response)

})

// let tmp = "chat-srk@gmail.com-virat@kohli"
/*
io.on('connection', (socket) => {
    let uniqueId;
    console.log("Socket Connected", socket.id)
    socket.on('set-emails', (emails) => {
        const { sEmail, rEmail } = emails
        let uniqueIdList = [sEmail, rEmail]
        uniqueIdList.sort()
        uniqueId = uniqueIdList[0] + "-" + uniqueIdList[1];
        console.log(uniqueId)
        console.log(`chat-${uniqueId}`)
    })
    socket.on(`chat-${uniqueId}`, (payload) => {
        console.log(payload)
        console.log("dklaskdlaskd;la")

    })
})
*/
io.on('connection', (socket) => {
    console.log("Socket Connected", socket.id);
    let uniqueId;
    socket.on('send-emails', (emails) => {
        const { sEmail, rEmail } = emails;
        let uniqueIdList = [sEmail, rEmail];
        uniqueIdList.sort();
        uniqueId = uniqueIdList[0] + "-" + uniqueIdList[1];
        console.log(uniqueId);
        socket.join(`room-${uniqueId}`)
        socket.on(`chat-${uniqueId}`, (payload) => {
            io.to(`room-${uniqueId}`).emit(`chat-${uniqueId}`, payload)
        });
    });
});

// const addToChats=async()=>{

// }

// const startSavingToDatabase =()=>{
//     setTimeout(()=>{
//         addToChats()
//     },5000)
// }

// startSavingToDatabase()



server.listen(5001, () => console.log("WS connected"))






/*
chat Model -> {
    chatId:ObjectId,
    chatUniqueAddress:String,required:true,
    chats:[Object]
}
*/

/*
 const chechIfThisChatExists = await Chat.find({ chatUniqueId: `chat-${uniqueId}` })
            if (chechIfThisChatExists[0]) {
                const updatedChats = [...chechIfThisChatExists.chats, payload]
                await Chat.findOneAndUpdate({ chatUniqueId: `chat-${uniqueId}` }, { chats: updatedChats })
            }
            else {
                await Chat.create({
                    chatUniqueId: `chat-${uniqueId}`,
                    chats: [payload]
                })
            }
*/

/*
            const chechIfThisChatExists = await Chat.find({ chatUniqueId: `chat-${uniqueId}` })
            if (chechIfThisChatExists) {
                const updatedChats = [...chechIfThisChatExists[0].chats, payload]
                await Chat.findOneAndUpdate({ chatUniqueId: `chat-${uniqueId}` }, { chats: updatedChats })
            }
            else {
                await Chat.create({
                    chatUniqueId: `chat-${uniqueId}`,
                    chats: [payload]
                })
            }
            */
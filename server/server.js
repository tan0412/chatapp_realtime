import  express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
const io = new Server(server);
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import friendRoute from './routes/friend.js'
import roomRoute from './routes/roomChat.js'
import messageRoute from './routes/message.js'
import Message from './models/Message.js';
import admin from 'firebase-admin'
import mongoose from 'mongoose';
import RoomChat from './models/RoomChat.js';
// import * as serviceAccount from './serviceAccountKey.json' assert { type: 'json' };
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });


app.use(express.urlencoded({ extended: true, limit:'50mb'}));
app.use(express.json({limit: '50mb'}));


// Connection URI
const uri = 'mongodb+srv://tan2000:1234@cluster0.cvvbxwf.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB Atlas');
});



// Create a chatBox
function createOrFindChatBox(userId, user1Id) {
    RoomChat.find({$and: [{users: userId}, {users: user1Id}]})
    .exec()
    .then((chats) => {
        for (let chat of chats) {
            if (chat.users.includes(userId) && chat.users.includes(user1Id)) {
                return chat._id
        }}
        const newChat = new RoomChat({users: [userId, user1Id], messages: []});
        return newChat.save()
    })
}

// Hàm gửi thông báo đẩy
function sendPushNotification(deviceToken, title, body) {
    const message = {
      notification: {
        title: title,
        body: body
      },
      token: deviceToken
    };
  
    admin.messaging().send(message)
      .then((response) => {
        console.log('Push notification sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending push notification:', error);
      });
  }
// Handle a new  connection with socket.io       
io.on('connection', (socket) => {
    console.log('User connection established');
   
    socket.on('joinChat', ({userId}) => {
        console.log(`User joined chat ${userId}`);
        socket.join(userId);
    })

    socket.on('sendMessage', async ({sender, recipient, message}) => { 
        createOrFindChatBox(sender, recipient)
        const newMessage = new Message({
            sender: sender,
            recipient: recipient,
            content: message
        })
        await newMessage.save()
       const roomChat = await  RoomChat.find({$and: [{users: sender}, {users: recipient}]})
       for (let chat of roomChat) {
        if (chat.users.includes(sender) && chat.users.includes(recipient)) {
            chat.messages.push(newMessage._id)
            await chat.save()
        }
       }
       

        io.to(recipient).emit('receiveMessage', newMessage)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
},

   
                                                                                                               );
app.use("/auth", authRoute);
app.use("/", userRoute);
app.use("/", friendRoute);
app.use("/", roomRoute);
app.use("/", messageRoute);

server.listen(8080,'192.168.61.103', (req, res) => {
    console.log('listening on port 8080')
})


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const io = new Server(server);
const User = require('./models/User.js');
const FriendRequest = require('./models/Friend.js');
const Message = require('./models/Message.js');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // Đường dẫn đến tệp serviceAccountKey.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.use(express.urlencoded({ extended: true, limit:'50mb'}));
app.use(express.json({limit: '50mb'}));

require('./connection')
const bcrypt = require('bcrypt');
const RoomChat = require('./models/RoomChat.js');

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
}                                                                                                                       );

app.put('/user/status', async (req, res) => {
    try {
        const { status } = req.body
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        if(decodedToken) {
            const userId = decodedToken.userId;
            await User.findByIdAndUpdate(userId, {status: status}, {new:true});
        
            return res.status(200).json({message: 'User saved successfully'});
        }
    } catch(e){
        console.error(e);
    }
})


app.get('/user/message/:recipient', async (req, res) => {
    try {
        const recipient = req.params.recipient
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        if(decodedToken) {
            const userId = decodedToken.userId;
            const messages = await Message.find({
                $or: [
                    {sender: userId, recipient: recipient},
                    {sender: recipient, recipient:userId},
                ] 
            }).sort({timestamp: -1})
            res.status(200).send(messages)
        }
    } catch(e){
        console.error(e);
    }
})

app.get('/chatroom', async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = verifyToken(token);
      if (decodedToken) {
        const userId = decodedToken.userId;
        const chatBox = await RoomChat.find({ users: userId })
          .populate({ path: 'messages',select: 'content timestamp', options: {sort:{timestamp: 'desc'}}})
          .populate({ path: 'users', select: 'name picture status', match: {_id: {$ne: userId}} })
          .lean()
        
        res.send(chatBox);
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

function generateToken(user) {
    const payload = {
        userId: user.id,
    }
    const options = {expiresIn: '1d'}
    const secret = 'dfsdfsdjfkdjfks456djfdsfjioweuu()[][]'
    return jwt.sign(payload, secret, options)
}

function verifyToken(token) {
    try {
      const secretKey = 'dfsdfsdjfkdjfks456djfdsfjioweuu()[][]'
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

app.post('/register', async (req, res) => {
    try {
        const { name, email,  password, phone } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(201).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword, phone}); 
        await user.save();
        res.status(200).json({message: 'User created'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
})

 app.post('/login', async (req, res) => {
    try {
        const { email, password, deviceToken } = req.body; 
        const user = await User.findOne({email})   
        if(!user) {
            return res.status(201).json({ message: 'User does not exist' });
        } 
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword){
            return res.status(202).json({ message: 'Password Invalid' });
        }
        const token = generateToken(user);
        user.token = token;
        user.deviceToken = deviceToken;
        user.status = 'online'
        await user.save();
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 })
  
 app.get('/users', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token);
    if (decodedToken) {
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        res.status(200).send(user);
    }else {
        res.status(301).send('Unauthorized');   
    }
 })
 
 app.put('/update', async (req, res) => {
    try {
        const { name, email, phone, picture } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token) 
        if (decodedToken) {
            const userId = decodedToken.userId
            await User.findByIdAndUpdate(userId, { name: name, email: email, phone: phone, picture: picture }, {new: true})
            return res.status(200).json({ message: 'ok' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Unauthorized');
    }
 })

 app.get('/list_user/:phone', async (req, res) => {
    try {
    const phone = req.params.phone;
    const user = await User.findOne({phone: phone})
    if (!user) {
       res.status(202).send('Not Found');
    } else{
        const {_id, name, phone, picture} = user
        res.status(200).send({name, phone, picture, _id})}
 } catch (error) {
    console.error(error)
 }
})

// app.post('/user/friends', async (req, res) => {
//     try {
//         const { name, phone, picture } = req.body;
//         const friend = { name, phone, picture}
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = verifyToken(token) 
//         if (decodedToken) {
//             const userId = decodedToken.userId
//             const user = await User.findById(userId)
//             user.friends.push(friend)
//             await user.save()
//             return res.status(200).json({ message: 'ok' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send('Unauthorized');
//     }
// })

app.post('/user/friend-request', async (req, res) => {
    try {
    const {_id} = req.body;
    const recipient = _id
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token) 
    if(decodedToken) {
        const sender = decodedToken.userId;
        const existingRequest = await FriendRequest.findOne({ recipient, sender})
        if(existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists'})
        }
        const friendRequest = new FriendRequest({sender,recipient})
        await friendRequest.save()
        return res.status(200).json({ message: 'Friend request successfully'})
    }} catch(error) {
       return res.status(500).json({ message: 'Friend request error' })
    }
})


app.put('/user/friend-request/accepted', async (req, res) => {
    try {
    const { sender, status } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token) 
    if (decodedToken) {
        const recipient = decodedToken.userId
        if (status !== 'accepted' && status !=='rejected') {
        return res.status(400).json('Invalid status')
    }
    const friendRequest = await FriendRequest.findOne({recipient, sender})
    if (!friendRequest) {
        return res.status(400).json({ message: 'Friend request not found' })
    }
    
    if (status === 'accepted') {
        const user1 = await User.findOne(friendRequest.sender)
        user1.friends.push(friendRequest.recipient)
        await user1.save()
        const user2 = await User.findOne(friendRequest.recipient)
        user2.friends.push(friendRequest.sender)
        await user2.save()
        await FriendRequest.deleteOne({_id:friendRequest._id})
    }else {
       await FriendRequest.deleteOne({_id : friendRequest._id})
    }}
    return res.status(200).json({ message: 'Friend request successfully'})
    } catch (e) {
        console.error(e)
    }   
})

app.get('/users/friend-request/recipient',async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        if (decodedToken) {
            const userId = decodedToken.userId
        const users = await FriendRequest.find({recipient : userId}).populate('sender')
        if (users.length > 0) {
            const senders = users.map((user) => user.sender)
            res.status(200).send(senders)
        } else {
            res.status(404).send('No users found')
        }
    }} catch (err) {
        console.error(err)
    }
})

app.get('/user/list-friend',async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        if (decodedToken) {
            const userId = decodedToken.userId
            const user = await User.findById(userId).populate('friends')
            if (user.friends.length > 0) {
            res.status(200).send(user.friends)
            } else {
                res.status(404).send({ message: 'No friends found'})
            }
        
    }} catch (err) {
        console.error(err)
    }
})

app.get('/users/friend-request/sent',async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        if (decodedToken) {
            const userId = decodedToken.userId
        const users = await FriendRequest.find({sender : userId}).populate('recipient')
        if (users.length > 0) {
            const recipients = users.map((user) => user.recipient)
            res.status(200).send(recipients)
        } else {
            res.status(404).send('No users found')
        }
    }} catch (err) {
        console.error(err)
    }
})

app.post('/user/friend-request/cancel', async (req, res) => {
    try {
    const {_id} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = verifyToken(token) 
    if(decodedToken) {
        const sender = decodedToken.userId;
        const friendRequest = await FriendRequest.findOne({ recipient: _id, sender})
        console.log(friendRequest)
        if(!friendRequest) {
            return res.status(400).json({ message: 'Friend request not found'})
        }
        await FriendRequest.deleteOne(friendRequest._id)
        return res.status(200).json({ message: 'Friend request deleted successfully' })
    }} catch(error) {
       console.error(error) 
    }
}) 

server.listen(8080,'192.168.13.107', (req, res) => {
    console.log('listening on port 8080')
})


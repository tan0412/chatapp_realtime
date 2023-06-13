import RoomChat from "../models/RoomChat.js";

export function createOrFindChatBox(userId, user1Id) {
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

export const getRoomChat = async (req, res) => {
    try {
        const userId = req.userId;
        const chatBox = await RoomChat.find({ users: userId })
          .populate({ path: 'messages',select: 'content timestamp', options: {sort:{timestamp: 'desc'}}})
          .populate({ path: 'users', select: 'name picture status', match: {_id: {$ne: userId}} })
          .lean()
        res.send(chatBox);
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
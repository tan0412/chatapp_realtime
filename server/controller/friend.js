import User from '../models/User.js';
import FriendRequest from '../models/Friend.js';

export const sendFriendRequest = async (req, res) => {
    try {
    const {_id} = req.body;
    const recipient = _id 
    const sender = req.userId;
    const existingRequest = await FriendRequest.findOne({ recipient, sender})
    if(existingRequest) {
        return res.status(400).json({ message: 'Friend request already exists'})
    }
    const friendRequest = new FriendRequest({sender,recipient})
    await friendRequest.save()
    return res.status(200).json({ message: 'Friend request successfully'})
    } catch(error) {
       return res.status(500).json({ message: 'Friend request error' })
    }
}

export const getResFriendRequest =  async (req, res) => {
    try {
    const { sender, status } = req.body;
        const recipient = req.userId
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
    }
    return res.status(200).json({ message: 'Friend request successfully'})
    } catch (e) {
        console.error(e)
    }   
}

export const getListSendersFriendRequest = async (req, res) => {
    try {   
    const userId = req.userId
    const users = await FriendRequest.find({recipient : userId}).populate('sender')
    if (users.length > 0) {
        const senders = users.map((user) => user.sender)
        res.status(200).send(senders)
    } else {
        res.status(404).send('No users found')
    }
    } catch (err) {
        console.error(err)
    }
}

export const getListRecipientsFriendRequest = async (req, res) => {
    try {
        const userId = req.userId
        const users = await FriendRequest.find({sender : userId}).populate('recipient')
        if (users.length > 0) {
            const recipients = users.map((user) => user.recipient)
            res.status(200).send(recipients)
        } else {
            res.status(404).send('No users found')
        }
    } catch (err) {
        console.error(err)
    }
}

export const cancelFriendRequest = async (req, res) => {
    try {
        const {_id} = req.body;
        const sender = req.userId;
        const friendRequest = await FriendRequest.findOne({ recipient: _id, sender})
        if(!friendRequest) {
            return res.status(400).json({ message: 'Friend request not found'})
        }
        await FriendRequest.deleteOne(friendRequest._id)
        return res.status(200).json({ message: 'Friend request deleted successfully' })
    }catch(error) {
       console.error(error) 
    }
}

export const getListFriends = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).populate('friends')
        if (user.friends.length > 0) {
        res.status(200).send(user.friends)
        } else {
            res.status(404).send({ message: 'No friends found'})
        }
    } catch (err) {
        console.error(err)
    }
}
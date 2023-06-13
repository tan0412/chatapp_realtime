import mongoose from "mongoose"


const friendRequestSchema  = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
    
})

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

export default FriendRequest
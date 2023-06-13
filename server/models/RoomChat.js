import mongoose from "mongoose"

const roomChatSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const RoomChat = mongoose.model('RoomChat', roomChatSchema)

export default RoomChat
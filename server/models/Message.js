const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        require: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
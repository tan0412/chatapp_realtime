const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { pictureDefault } = require('../constant');


const useSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        index: 1,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
    },
    picture: {
        type: String,
        default: pictureDefault
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    deviceToken: {
        type: String,
    },
    status: {
        type: String,
        default: 'offline'
    }
}); 

const User = mongoose.model('User', useSchema);

module.exports = User;
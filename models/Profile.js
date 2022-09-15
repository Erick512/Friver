const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    userID:{
        type: String,
        require: true
    },
    userName:{
        type: String,
        require: true
    },
    skills: [{
        type: String,
        require: false
    }],
    description: {
        type: String,
        require: false
    },
    phoneNumber: {
        type: Number,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: false
    },
    qrCode: {
        type: String,
        require: false
    }

})

module.exports = mongoose.model('Profile', ProfileSchema)
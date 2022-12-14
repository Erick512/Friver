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
    fullName:{
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
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
        type: String,
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
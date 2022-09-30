const mongoose = require("mongoose");

const timeExpiration = 3600

const SurgeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
        type: Date,
        expires: '5m',
        default: Date.now
    }
});

module.exports = mongoose.model("Surge", SurgeSchema);
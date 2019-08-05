const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Message', messageSchema);
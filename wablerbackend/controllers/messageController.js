const Message = require('../models/Messages');
const User = require('../models/User');

// Get all the message
module.exports.getMessage = async function(req, res, next){
    try {
        let allMessage = await Message.find({}).sort({'updatedAt': -1}).populate('author', {
            name: true,
            email:true,
            username: true
        });
        res.status(200).json({
            allMessage
        })   
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

// Add new message
module.exports.newMessage = async function(req, res, next){
    try {
        // Create message
        let message = await Message.create({text:req.body.text, author: req.params.id});
        let user = await User.findById(req.params.id);
        // Add message in a respective user document
        user.messages.push(message.id);
        user.save();
        // Fetch message and populate user data in it.
        let findMessage = await Message.findById(message._id).populate('author', {
            name: true,
            email: true,
            username: true
        })
        res.status(200).json({
            findMessage
        })   
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports.deleteMessage = async function(req, res, next){
    try {
        // Get respective message
        let message = await Message.findById(req.params.id);
        console.log(message);
        // Get respective user for a given message
        let user = await User.findById(message.author);
        console.log(user);
        // Remove the given message from the users messages array
        user.messages.remove(req.params.id);
        await user.save();
        // Delete the given messages
        let delMessage = await Message.deleteOne({_id: req.params.id});
        res.status(200).json({
            delMessage
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}
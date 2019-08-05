const Users = require('../models/User');
const db = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports.index = function(req, res, next) {
    res.send('respond with a resource');
}

module.exports.login = async function(req, res, next){
    try {
        let user = await Users.findOne({email: req.body.email});
        if(user){
            let isMatch = await user.comparePassword(req.body.password);
            console.log(isMatch);
            let {_id, username, email, name, number} = user;
            if(isMatch){
                let token = jwt.sign({user}, process.env.JWT_SECRET_KEY);
                return res.status(200).json({
                    _id,
                    username,
                    email,
                    number,
                    name,
                    token
                })
            }else{
                return next({
                    status: 400,
                    message: "Invalid credentials."
                });
            }
        }else{
            return next({
                status: 400,
                message: "Invalid credentials."
            });
        }    
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error.message
        })
    }
    
}

module.exports.signup = async function(req, res, next){
    try {
        console.log(req.body)
        let user = await Users.create(req.body);
        let {_id, username, email, name, number} = user;
        let token = jwt.sign({user}, process.env.JWT_SECRET_KEY);
        return res.status(200).json({
            _id,
            username,
            email,
            number,
            name,
            token
        })
        
    } catch (error) {
        console.log(error);

        return res.status(400).json({
            error: error.ValidatorError ? error.ValidatorError : error.message 
        })
    }
}
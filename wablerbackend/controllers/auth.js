const jwt = require('jsonwebtoken');

module.exports.loginCheck = function(req, res, next){
    try {
        console.log(req.headers);
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, payload){
            console.log(payload);
            if(payload){
                return next();
            }else{
                return next({
                    status: 401,
                    message: "Please login first !!"
                })
            }
        })   
    } catch (error) {
        return next({
            status: 401,
            message: "Please login first !!"
        })
    }
}

module.exports.checkUser = function(req, res, next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, payload){
            console.log(payload, req.params);
            if(payload && payload.user._id === req.params.id){
                return next();
            }else{
                return next({
                    status: 401,
                    message: "Unauthorized !!!"
                })
            }
        })   
    } catch (error) {
        return next({
            status: 401,
            message: "Unauthorized !!!"
        })
    }
}
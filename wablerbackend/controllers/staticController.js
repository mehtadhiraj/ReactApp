module.exports.index = function(req, res, next) {
    res.json({
        success:{
            message: "Page Loaded Successfully"
        }
    })
}
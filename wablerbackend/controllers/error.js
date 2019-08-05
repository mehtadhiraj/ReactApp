module.exports = function(err, req, res, next) {
    console.log(err.message)
    let error = new Error(err.message);
    error.status = 400;
    // Send error json responce
    return res.status(error.status || 500).json({
        error: error.message
    });
}
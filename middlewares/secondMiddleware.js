module.exports = function(req, res, next) {
    const time = new Date();
    console.log(`Date when you made a request: ${time}`);
    next();
}


const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {

    let token = req.headers['authorization'];

    if (!token) {
        return res.send({
            statusCode: 401,
            status: false,
            message: "Token required"
        })
    }

    try {
        let decodedToken = jwt.verify(token, config.get("jwtSecret"));
        req.decoded = {
            id: decodedToken.id
        }
        next();
    } catch (err) {
        res.send({
            statusCode: 500,
            status: false,
            message: "Invalid token"
        })
    }
}
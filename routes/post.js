const express = require('express');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send({
        success: "true",
        statusCode: 200,
        message: "Sucess! POST API POINT IS HIT"
    });
});

module.exports = Router;
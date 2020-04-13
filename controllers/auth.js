const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcryptjs = require('bcryptjs');
const { validationResult } = require("express-validator");

module.exports = {
    authenticate: async function (req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({
                statusCode: 400,
                status: false,
                message: errors.array()
            });
        }

        try {
            let userObj = await UserModel.findOne({
                email: req.body.email
            });

            if (!userObj) {
                return res.send({
                    statusCode: 404,
                    status: false,
                    message: "Resource doesn't exist"
                });
            }

            let isSame = await bcryptjs.compare(req.body.password, userObj.password);

            if (!isSame) {
                return res.send({
                    statusCode: 401,
                    status: false,
                    message: "Email or password is incorrect"
                });
            }

            jwt.sign({ id: userObj.id }, config.get("jwtSecret"), {
                expiresIn: 2400000
            }, (err, token) => {
                let response = {};
                if (err) {
                    respone.statusCode = 500;
                    response.status = false;
                    response.message = "Server error";
                } else {
                    response.statusCode = 200;
                    response.status = true;
                    response.message = "User loggedin successfully!";
                    response.token = token;
                }
                return res.send(response);
            });

        } catch (err) {
            console.log('Error: ', err);
            return res.send({
                statusCode: 500,
                status: false,
                message: err.message
            });
        }
    }
}
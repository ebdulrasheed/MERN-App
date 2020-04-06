const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User");
const gravatar = require("gravatar");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
    registerUser: async function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({
                statusCode: 400,
                status: false,
                message: errors.array()
            });
        }

        const { name, email, password } = req.body;

        try {

            let userObj = await UserModel.findOne({
                email
            });

            if (userObj) {
                return res.send({
                    statusCode: 409,
                    status: false,
                    message: "Resource already exists"
                });
            }

            let avatarURL = await gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            let user = new UserModel({
                name,
                email,
                password,
                avatar: avatarURL
            });

            const salt = await bcryptjs.genSalt();
            user.password = await bcryptjs.hash(password, salt);

            await user.save();

            jwt.sign({ id: user.id }, config.get("jwtSecret"), {
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
                    response.message = "User created successfully!";
                    response.data = user;
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
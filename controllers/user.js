const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/User");
const gravatar = require("gravatar");
const { validationResult } = require("express-validator");

module.exports = {
    registerUser: async function (req, res) {
        const errors = validationResult(req);
        let response;
        
        if (!errors.isEmpty()) {
            return res.send({
                statusCode: 400,
                status: false,
                message: errors.array()
            });
        }

        console.log('Body: ', req.body);
        const { name, email, password } = req.body;

        try {

            let userObj = await UserModel.findOne({
                email
            });

            if (userObj) {
                res.send({
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
            })

            const salt = await bcryptjs.genSalt();
            user.password = await bcryptjs.hash(password, salt);

            userObj = await user.save();

            res.send({
                statusCode: 200,
                status: true,
                message: "User already exists",
                data: userObj
            });

        } catch (err) {
            console.log('Error: ', err);
            res.send({
                statusCode: 500,
                status: false,
                message: err.message
            });
        }

        response = {
            success: "true",
            statusCode: 200,
            message: "Sucess! USER API POINT IS HIT"
        }
        res.status(200).json(response);
    }
}
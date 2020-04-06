const express = require('express');
const { check, validationResult } = require("express-validator");
const Router = express.Router();
const UserController = require('../controllers/user');

Router.post("/",
    [
        check('name', 'Name is required').not().notEmpty().isString(),
        check('email', 'Email is required').not().notEmpty().isEmail(),
        check('password', 'Password is required').not().notEmpty().isString().isLength({ min: 6 })
    ],
    UserController.registerUser
);

module.exports = Router;
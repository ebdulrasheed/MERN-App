const express = require('express');
const AuthController = require('../controllers/auth');
const { check } = require("express-validator");
const authMiddlware = require('../middlewares/auth');
const Router = express.Router();

Router.post("/", authMiddlware,     [
    check('email', 'Email is required').notEmpty().isEmail(),
    check('password', 'Password is required').notEmpty().isString().exists()
], AuthController.authenticate);

module.exports = Router;
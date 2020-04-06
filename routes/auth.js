const express = require('express');
const AuthController = require('../controllers/auth');
const authMiddlware = require('../middlewares/auth');
const Router = express.Router();

Router.get("/", authMiddlware, AuthController.getUserProfile);

module.exports = Router;
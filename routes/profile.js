const express = require('express');
const { check, validationResult } = require("express-validator");
const Router = express.Router();
const ProfileController = require('../controllers/profile');
const authMiddleware = require('../middlewares/auth');

Router.get("/me", authMiddleware,
    // [
    //     check('name', 'Name is required').not().notEmpty().isString(),
    //     check('email', 'Email is required').not().notEmpty().isEmail(),
    //     check('password', 'Password is required').not().notEmpty().isString().isLength({ min: 6 })
    // ],
    ProfileController.getProfile
);

Router.post("/", [authMiddleware,
    [
        check('status', 'Status is required').not().notEmpty().isString(),
        check('skills', 'Skill is required').not().notEmpty(),
        check('githubUsername', 'github username is required').not().notEmpty().isString()
    ]],
    ProfileController.createOrUpdateProfile
);

module.exports = Router;
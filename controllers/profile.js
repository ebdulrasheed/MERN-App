const ProfileModel = require("../models/profile");
const { validationResult } = require("express-validator");

module.exports = {
    getProfile: async function (req, res) {

        try {

            let profile = await ProfileModel.findOne({ user: req.decoded.id }).populate(
                'user', ['name', 'avatar']
            );

            if (!profile) {
                return res.send({
                    statusCode: 404,
                    status: false,
                    message: "Resource doesn't exist"
                });
            }

            return res.send({
                statusCode: 200,
                status: true,
                message: "Profile fetched successfully!",
                data: profile
            });

        } catch (err) {
            console.log('Error: ', err);
            return res.send({
                statusCode: 500,
                status: false,
                message: err.message
            });
        }
    },

    createOrUpdateProfile: async function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({
                statusCode: 400,
                status: false,
                message: errors.array()
            });
        }

        const { company,
            website,
            location,
            status,
            bio,
            githubUsername,
            skills,
            youtube,
            twitter,
            instagram,
            linkedin
        } = req.body;

        let profileFields = {};
        profileFields.user = req.decoded.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        profileFields.status = status;
        profileFields.githubUsername = githubUsername;
        if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            console.log('ID: ', req.decoded.id);
            let isExist = await ProfileModel.findOne({ user: req.decoded.id });

            let profile;
            if (!isExist) {
                console.log('!isNew: ', isExist);
                profile = await ProfileModel.create(profileFields);
                console.log('!Profile: ', profile);
            } else {
                console.log('isNew: ', isExist);
                profile = await ProfileModel.findOneAndUpdate({ user: req.decoded.id }, { $set: profileFields }, {
                    new: true,
                });
                console.log('Profile: ', profile);
            }

            if (profile) {
                return res.send({
                    statusCode: 200,
                    status: true,
                    message: "Profile created or updated successfully",
                    data: profile
                });
            }
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
const UserModel = require("../models/User");

module.exports = {
    getUserProfile: async function (req, res) {

        try {
            let userObj = await UserModel.findById({
                _id: req.decoded.id
            }).select('-password');

            if (!userObj) {
                return res.send({
                    statusCode: 404,
                    status: false,
                    message: "Resource doesn't exist"
                });
            }

            return res.send({
                statusCode: 200,
                status: true,
                message: "Data fetched successfully",
                data: userObj
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
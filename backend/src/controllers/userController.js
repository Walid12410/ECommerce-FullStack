const asyncHandler = require("express-async-handler");
const { validationUpdateUser } = require("../validators/userValidator");
const userModel = require("../model/user");


/**
 * @desc Get all user
 * @Route /api/user
 * @method get
 * @access public ( only admin )
*/
module.exports.getAllUserController = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    let users;

    // Convert query parameters to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (page && limit) {
        // Ensure valid numbers are passed
        if (isNaN(pageNumber) || pageNumber <= 0) {
            return res.status(400).json({ message: "Page must be a positive integer" });
        }
        if (isNaN(limitNumber) || limitNumber <= 0) {
            return res.status(400).json({ message: "Limit must be a positive integer" });
        }

        users = await userModel.getUsers(pageNumber, limitNumber);
    } else {
        users = await userModel.getAllUser();
    }

    res.status(200).json(users);
});


/**
 * @desc update user profile
 * @Route /api/user/:id
 * @method put
 * @access public ( only user him helf )
*/
module.exports.updateUserProfileController = asyncHandler(async (req, res) => {
    const { error } = validationUpdateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await userModel.getUserById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const data = {
        UserNo: req.params.id,
        UserName: req.body.UserName,
        PhoneNumber: req.body.PhoneNumber,
    };

    const updatedUser = await userModel.updateUser(data);

    // Send the updated user data as the response
    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });

});



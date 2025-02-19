const asyncHandler = require("express-async-handler");
const { validationRegisterUser, validationLoginUser } = require("../validators/userValidator");
const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middlewares/generateToken");

/**
 * @desc Create new user
 * @Route /api/auth/register
 * @method POST
 * @access public 
*/
module.exports.registerUserController = asyncHandler(async (req, res) => {
    const { error } = validationRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await userModel.getUserByEmail(req.body.Email);
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    const data = {
        Email: req.body.Email,
        UserName: req.body.UserName,
        PhoneNumber: req.body.PhoneNumber,
        password: req.body.Password
    };

    await userModel.createUser(data);
    return res.status(201).json({ message: "Your registered succesfully, please login" });
});


/**
 * @desc login user
 * @Route /api/auth/login
 * @method POST
 * @access public 
*/
module.exports.loginUserController = asyncHandler(async (req, res) => {
    const { error } = validationLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await userModel.getUserByEmail(req.body.Email);
    if (!user) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Compare password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    // generate token
    const token = generateToken(user.UserNo, user.IsAdmin, res);

    // Omit the password from the user object before sending it in the response
    const { Password, ...userWithoutPassword } = user;

    res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword, // Return the user object without the password
        token
    });
});


/**
 * @desc login admin
 * @Route /api/auth/login-admin
 * @method POST
 * @access public 
*/
module.exports.loginAdminController = asyncHandler(async (req, res) => {
    const { error } = validationLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = await userModel.getUserByEmail(req.body.Email);
    if (!user) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    if (!user.IsAdmin) {
        return res.status(403).json({ message: "Forbidden" });
    }

    // Compare password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    // generate token
    const token = generateToken(user.UserNo, user.IsAdmin, res);

    // Omit the password from the user object before sending it in the response
    const { Password, ...userWithoutPassword } = user;

    res.status(200).json({
        message: "Login successful",
        user: userWithoutPassword, // Return the user object without the password
        token
    });
});


/**
 * @desc logout user
 * @Route /api/auth/logout
 * @method POST
 * @access public 
 * @param {Object} res - Express response object
*/
module.exports.logoutUserController  = asyncHandler(async(_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
});


/**
 * @desc check auth
 * @Route /api/auth/check
 * @method get
 * @access private (required user token) 
*/
module.exports.checkAuthController = asyncHandler(async(req,res)=>{
    const user = await userModel.getUserById(req.user.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ message: "Authorized", user });
});
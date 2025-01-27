const asyncHandler = require("express-async-handler");
const { validationRegisterCompanyUser, validationLoginCompanyUser } = require("../validators/companyUserValidator");
const companyUserModel = require("../model/companyUser");
const { generateCompanyToken } = require("../middlewares/generateCompanyToken");

/**
 * @desc Create new company user
 * @Route /api/company-auth/register
 * @method POST
 * @access private (only admin can create company user) 
*/
module.exports.createCompanyUserController = asyncHandler(async (req, res) => {
    const { error } = validationRegisterCompanyUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = {
        FullName: req.body.FullName,
        Email: req.body.Email,
        Password: req.body.Password,
        CompanyNo: req.body.CompanyNo
    }

    const result = await companyUserModel.createUser(user);

    if (result.emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    } else if (result.companyNotFound) {
        return res.status(400).json({ message: "Company not found" });
    } else if (result.success) {
        return res.status(201).json({ message: "User created successfully" });
    } else {
        return res.status(500).json({ message: "Failed to create user" });
    }
}); 


/**
 * @desc login company user
 * @Route /api/company-auth/login
 * @method POST
 * @access public 
*/
module.exports.loginCompanyUserController = asyncHandler(async (req, res) => {
    const {error} = validationLoginCompanyUser(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    const user = await companyUserModel.getUserByEmail(req.body.Email);
    if(user.length === 0){
        return res.status(400).json({message: "Incorrect email or password"});
    }

    const isPasswordValid = await bcrypt.compare(req.body.Password, user.Password);
    if(!isPasswordValid){
        return res.status(400).json({message: "Incorrect email or password"});
    }
    
    // generate token
    const token = generateCompanyToken(user.UserNo, user.CompanyNo, res);

    // Omit the password from the user object before sending it in the response
    const { Password, ...userWithoutPassword } = user;

    res.status(200).json({  
        message : "Login successful",
        user: userWithoutPassword,
        token
    });
});


/**
 * @desc logout user
 * @Route /api/company-auth/logout
 * @method POST
 * @access public 
 * @param {Object} res - Express response object
*/
module.exports.logoutCompanyUserController  = asyncHandler(async(_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
});


/**
 * @desc check auth
 * @Route /api/company-auth/check
 * @method get
 * @access private (required user token) 
*/
module.exports.checkCompanyAuthController = asyncHandler(async(req,res)=>{
    const user = await companyUserModel.getUserByCompanyId(req.user.companyNo);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.status(200).json({ message: "Authorized", user });
});
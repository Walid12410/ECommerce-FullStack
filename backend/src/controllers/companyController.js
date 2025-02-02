const asyncHandler = require("express-async-handler");
const validationCompany = require("../validators/companyValidator");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const companyModel = require("../model/company");


/**
 * @desc create company
 * @Route /api/company
 * @method post
 * @access private (only admin)
*/
module.exports.createNewCompanyController = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Product image is required" });
    }
    
    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);
    
    try {
        const {error} = validationCompany(req.body);
        if (error) {
            return res.status(400).json({message : error.details[0].message});
        }

        const imageResult = await cloudinaryUploadImage(imagePath);

        const company = {
            name : req.body.CompanyName,
            email : req.body.CompanyEmail,
            number : req.body.CompanyNumber,
            location : req.body.CompanyLocation,
            image : imageResult.secure_url,
            imageID : imageResult.public_id,
            desc : req.body.Description
        }

        const result = await companyModel.createCompany(company);
        if(result.exists){
            return res.status(403).json({message : "Company already exists"});
        }else if(result.success){
            return res.status(201).json({message : "Company created successfully"});
        }else{
            return res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        console.log("Error creating company: ", error);
        return res.status(500).json({ message: error.message });
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});


/**
 * @desc get company
 * @Route /api/company
 * @method get
 * @access public
*/
module.exports.getAllCompanyController = asyncHandler(async(req,res)=>{
    const companies = await companyModel.getAllCompany();
    res.status(200).json(companies);
});


/**
 * @desc update company
 * @Route /api/company
 * @method put
 * @access private (only company)
*/
module.exports.updateCompanyController = asyncHandler(async(req,res)=>{
    
    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Company id is required" });
    }

    const { error } = validationCompany(req.body);
    if(error){
        return res.status(400).json({ message : error.details[0].message });
    }

    
    const company = {
        id : req.params.id,
        name : req.body.CompanyName,
        email : req.body.CompanyEmail,
        number : req.body.CompanyNumber,
        location : req.body.CompanyLocation,
        desc : req.body.Description
    }


    const result = await companyModel.updateCompany(company);
    if(result.notFound){
        return res.status(404).json({message : "Company not found"});
    } else if(result.success){
        return res.status(201).json({message : "Company updated successfully"});
    }else{
        return res.status(500).json({ message: "Internal server error" });
    }
});


// TODO: update company image and delete company with their products
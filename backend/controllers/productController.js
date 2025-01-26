const asyncHandler = require("express-async-handler");
const { validationCreateProduct } = require("../validators/productValidator");
const { cloundinaryUploadImage } = require("../utils/cloudinary");
const productModel = require("../model/product");
const fs = require("fs");


/**
 * @desc create product
 * @Route /api/product
 * @method post
 * @access private (only company)
*/
module.exports.createProductController = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Product image is required" });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);

    try {
        const { error } = validationCreateProduct(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const imageResult = await cloundinaryUploadImage(imagePath);

        const product = {
            CompanyNo: req.user.CompanyNo,
            ProductName: req.body.ProductName,
            ProductDesc: req.body.ProductDesc,
            Price: req.body.Price,
            Stock: req.body.Stock,
            SubCategoryNo: req.body.SubCategoryNo,
            CreatedAt: req.body.CreatedAt,
            ProductImage: imageResult.secure_url,
            ProductImageID: imageResult.public_id
        }

        const result = await productModel.createProduct(product);
        if (result.subCategoryNotFound) {
            return res.status(404).json({ message: "SubCategory not found" });
        } else if (result.companyNotFound) {
            return res.status(404).json({ message: "Company not found" });
        } else if (result.success) {
            return res.status(201).json({ message: "Product created successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }

    } catch (error) {
        console.log("Error create product: ", error);
        return res.status(500).json({ message: error.message});
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});


/**
 * @desc get products
 * @Route /api/product
 * @method get
 * @access public
*/
module.exports.getProductsController = asyncHandler(async(req,res)=>{
    const { page, limit, companyNo, subCategoryNo } = req.query;

    if(!page || !limit){
        return res.status(400).json({message: "Page and limit query is required"});
    }

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: "Page and limit must be numbers" });
    }

    if(companyNo){
        const result = await productModel.getAllProductByCompany(page, limit, companyNo);
        return res.status(200).json(result);
    } else if (subCategoryNo) {
        const result = await productModel.getAllProductBySubCategory(page, limit, subCategoryNo);
        return res.status(200).json(result);
    } else {
        const result = await productModel.getAllProduct(page, limit);
        return res.status(200).json(result);
    }
});


/**
 * @desc get one product
 * @Route /api/product/:id
 * @method get
 * @access public
*/
module.exports.getOneProductController = asyncHandler(async(req,res)=> {
    const { id } = req.params;

    if(id === undefined || id === ""){
        return res.status(400).json({message: "Product id is required"});
    }

    const result = await productModel.getOneProduct(id);
    return res.status(200).json(result);
});



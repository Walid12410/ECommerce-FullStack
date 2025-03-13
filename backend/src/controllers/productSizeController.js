const asyncHandler = require("express-async-handler");
const { validationCreateProductSize, validationUpdateProductSize } = require("../validators/productSizeValidator");
const productSizeModel = require("../model/productSize");



/**
 * @desc create product size
 * @Route /api/product-size
 * @method get
 * @access public
*/
module.exports.getAllProductSizeController = asyncHandler(async (req,res)=> {
    const result = await productSizeModel.getAllProductSize();

    if(result.length === 0){
        return res.status(404).json({message: "Product size not found"});
    }

    return res.status(200).json(result);
});


/**
 * @desc create product size
 * @Route /api/product-size
 * @method post
 * @access private (only company)
*/
module.exports.createProductSizeController = asyncHandler(async (req,res)=> {
    const {error} = validationCreateProductSize(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    const data = {
        ProductNo: req.body.ProductNo,
        SizeValue: req.body.SizeValue,
        Quantity: req.body.Quantity
    }

    const result = await productSizeModel.createProductSize(data);

    if(result.notFound){
        return res.status(404).json({message: "Product not found"});
    }else if(result.success){
        return res.status(201).json({message : "Product size created successfully"});
    }else{
        return res.status(500).json({message: "Failed to create product size"});
    }
});


/**
 * @desc update product size
 * @Route /api/product-size/:id
 * @method put
 * @access private (only company)
*/
module.exports.updateProductSizeController = asyncHandler(async (req,res)=> {
    const {error} = validationUpdateProductSize(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }

    if(!req.params.id){
        return res.status(400).json({message: "Product size id is required"});
    }

    const data = {
        ProductSizeNo: req.params.id,
        SizeValue: req.body.SizeValue,
        Quantity: req.body.Quantity
    }

    const result = await productSizeModel.updateProductSize(data);

    if(result.notFound){
        return res.status(404).json({message: "Product size not found"});
    }else if(result.success){
        return res.status(200).json({message : "Product size updated successfully"});
    }else{
        return res.status(500).json({message: "Failed to update product size"});
    }
});


/**
 * @desc delete product size
 * @Route /api/product-size/:id
 * @method delete
 * @access private (only company)
*/
module.exports.deleteProductSizeController = asyncHandler(async (req,res)=> { 
    if(!req.params.id){
        return res.status(400).json({message: "Product size id is required"});
    }

    const result = await productSizeModel.deleteProductSize(req.params.id);

    if(result.notFound){
        return res.status(404).json({message: "Product size not found"});
    }else if(result.success){
        return res.status(200).json({message : "Product size deleted successfully"});
    }else{
        return res.status(500).json({message: "Failed to delete product size"});
    }
});

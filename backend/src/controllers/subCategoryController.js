const asyncHandler = require("express-async-handler");
const subCategoryModel = require("../model/subCategory");
const {validationNewSubCategory, validationUpdateSubCategory} = require("../validators/subCategoryValidator");


/**
 * @desc get all subcategory
 * @Route /api/sub-category/
 * @method get
 * @access public
*/
module.exports.getAllSubCategoryController = asyncHandler(async(req,res)=>{
    const subCategories = await subCategoryModel.getAllSubCategory();
    res.status(200).json(subCategories);
});


/**
 * @desc create new subCategory
 * @Route /api/sub-category/
 * @method post
 * @access private
*/
module.exports.createNewSubCategoryController = asyncHandler(async(req,res)=>{
    const {error} = validationNewSubCategory(req.body);
    if(error) {
        return res.status(400).json({message : error.details[0].message});
    }

    const result = await subCategoryModel.createSubCategory(req.body.SubCategoryName, req.body.CategoryNo);
    if(result.exists) {
        return res.status(400).json({message : "SubCategory name already exists"});
    } else if(result.notFound) {
        return res.status(404).json({message : "Category not found"});
    } else {
        return res.status(201).json(result);
    }
});


/**
 * @desc update subCategory
 * @Route /api/sub-category/:id
 * @method put
 * @access private
*/
module.exports.updateSubCategoryController = asyncHandler(async(req,res)=>{
    const {error} = validationUpdateSubCategory(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    } 

    if(!req.params.id){
        return res.status(400).json({message : "Invalid id"});
    }

    const result = await subCategoryModel.updateSubCatgory(req.params.id, req.body.SubCategoryName, req.body.CategoryNo);

    // @TODO: check if categoryName is exists
    
    if(result.notFound) {
        return res.status(404).json({message : "SubCategory not found"});
    } else if(result.noChange) {
        return res.status(400).json({message : "Nothing change in this subCategory"});
    } else {
        return res.status(200).json(result);
    }

});

// @todo: delete
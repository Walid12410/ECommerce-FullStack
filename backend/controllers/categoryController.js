const asyncHandler = require("express-async-handler");
const { validationNewCategory,
    validationupdateCategory
} = require("../validators/categoryValidator");
const categoryModel = require("../model/category");


/**
 * @desc get all category with subcategory
 * @Route /api/category/subcategory
 * @method get
 * @access public
*/
module.exports.getCategoryAndSubCategoryController = asyncHandler(async(req,res)=> {
    const categories = await categoryModel.getAllCategoryAndSubCategory();

    // Parse the stringified JSON into an actual JSON object
    const parsedCategories = JSON.parse(categories);  // This will convert the string to an object

    // Send category data
    res.status(200).json(parsedCategories);
});


/**
 * @desc get all category
 * @Route /api/category/
 * @method get
 * @access public
*/
module.exports.getAllCategoryController = asyncHandler(async(req,res)=> {
    const categories = await categoryModel.getAllCategory();
    
    // Send category data
    res.status(200).json(categories);
});


/** 
 * @desc create new category
 * @Route /api/category
 * @method post
 * @access private (admin) 
*/
module.exports.createNewCategoryController = asyncHandler(async (req, res) => {
    const { error } = validationNewCategory(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const result = await categoryModel.createCategory(req.body.CategoryName);
    if (result.exists) {
        return res.status(400).json({ message: "Category name already exists" });
    } else {
        return res.status(201).json(result);
    }
});


/**
 * @desc update category
 * @Route /api/category/:id
 * @method put
 * @access private (admin) 
*/
module.exports.updateCategoryController = asyncHandler(async (req, res) => {
    const { error } = validationupdateCategory(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.params.id) {
        return res.status(400).json({ message: "Category id is missing" });
    }

    const updatedCategory = await categoryModel.updateCategory(req.params.id, req.body.CategoryName);
    if(updatedCategory.notFound) {
        return res.status(404).json({message : "Category not found"});
    }

    if(updatedCategory.noChange) {
        return res.status(400).json({message : "No change found, same category name"});
    }
    
    if(!updatedCategory) {
        return res.status(404).json({message : "Category not found"});
    }

    res.status(200).json(updatedCategory);
});


/**
 * @desc delete category
 * @Route /api/category/:id
 * @method delete
 * @access private (admin) 
*/
module.exports.deleteCategoryController = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Category id is missing" });
    }

    const result = await categoryModel.deleteCategory(req.params.id);

    if(result.notFound){
        return res.status(404).json({message : "Category not found"});
    }

    if(result.hasSubCategory){
        return res.status(400).json({message : "Can not delete category that subcategory use it"});
    }

    res.status(200).json(result);
});
const asyncHandler = require("express-async-handler");
const { validationColor } = require("../validators/colorValidator");
const colorModel = require("../model/color");


/**
 * @desc create color
 * @Route /api/color
 * @method post
 * @access private (only admin)
*/
module.exports.createColorController = asyncHandler(async(req,res)=>{
    const {error} = validationColor(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

    const result = await colorModel.createColor(req.body.ColorName);
    if(result.exists){
        return res.status(400).json({message : "Color name already exists"});
    }else if (result.success){
        return res.status(201).json({message : "Color created successfully"});
    }else {
        return res.status(500).json({message : "Internal server error"});
    }
});


/**
 * @desc get all color
 * @Route /api/color
 * @method get
 * @access public
*/
module.exports.getColorController = asyncHandler(async(req,res)=>{
    const result = await colorModel.getColor();
    res.status(200).json(result);
});


/**
 * @desc update color
 * @Route /api/color/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateColorController =asyncHandler(async(req,res)=>{
    const {error} = validationColor(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }

    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const color = {
        id : req.params.id,
        name : req.params.ColorName
    };

    const result = await colorModel.updateColor(color);
    if(result.notFound){
        return res.status(404).json({message : "Color not found"});
    }else if (result.success){
        return res.status(200).json({message : "Color updated successfully"});
    }else {
        return res.status(500).json({message : "Internal Server Error"});
    }
});


/**
 * @desc delete color
 * @Route /api/color/:id
 * @method delete
 * @access private (only admin)
*/
module.exports.deleteColorController = asyncHandler(async(req,res)=>{
    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const result = await colorModel.deleteColor(req.params.id);
    if(result.notFound){
        return res.status(404).json({message : "Color not found"});
    }else if (result.usedInProduct){
        return res.status(403).json({message : "Color already used in product"});
    }else if (result.success){
        return res.status(200).json({message : "Color deleted successfully"});
    }else {
        return res.status(500).json({message : "Internal Server Error"}); 
    }

});
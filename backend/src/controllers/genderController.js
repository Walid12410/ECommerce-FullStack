const asyncHandler = require("express-async-handler");
const { validationGender } = require("../validators/genderValidator");
const genderModel = require("../model/gender");
const { cloudinaryUploadImage, cloudinaryRemoveImage } = require("../utils/cloudinary");
const fs = require("fs");
const path = require("path");


/**
 * @desc create gender
 * @Route /api/gender
 * @method post
 * @access private (only admin)
*/
module.exports.createGenderController = asyncHandler(async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "Banner image is required" });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);


    try {
        const { error } = validationGender(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const imageResult = await cloudinaryUploadImage(imagePath);

        const data = {
            name: req.body.GenderName,
            imageUrl: imageResult.secure_url,
            imageId: imageResult.public_id
        }

        const result = await genderModel.createGender(data);
        if (result.exists) {
            await cloudinaryRemoveImage(imageResult.public_id);
            return res.status(400).json({ message: "Name already exists" });
        } else if (result.success) {
            return res.status(201).json({ message: "Created successfully" });
        } else {
            await cloudinaryRemoveImage(imageResult.public_id);
            return res.status(500).json({ message: "Internal server error" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error ", error });
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});


/**
 * @desc get all color
 * @Route /api/color
 * @method get
 * @access public
*/
module.exports.getGenderController = asyncHandler(async (req, res) => {
    const result = await genderModel.getGender();
    res.status(200).json(result);
});


/**
 * @desc update color
 * @Route /api/color/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateGenderController = asyncHandler(async (req, res) => {
    const { error } = validationGender(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const gender = {
        id: req.params.id,
        name: req.params.GenderName
    };

    const result = await genderModel.updateGender(color);
    if (result.notFound) {
        return res.status(404).json({ message: "Color not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Color updated successfully" });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


/**
 * @desc delete color
 * @Route /api/color/:id
 * @method delete
 * @access private (only admin)
*/
module.exports.deleteGenderController = asyncHandler(async (req, res) => {
    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const result = await genderModel.deleteGender(req.params.id);
    if (result.notFound) {
        return res.status(404).json({ message: "Color not found" });
    } else if (result.usedInProduct) {
        return res.status(403).json({ message: "Color already used in product" });
    } else if (result.success) {
        return res.status(200).json({ message: "Color deleted successfully" });
    } else {
        return res.status(500).json({ message: "Internal Server Error" });
    }

});
const asyncHandler = require("express-async-handler");
const { validationBrand } = require("../validators/brandValidator");
const brandModel = require("../model/brand");
const { cloudinaryRemoveImage, cloudinaryUploadImage } = require("../utils/cloudinary");


/**
 * @desc create brand
 * @Route /api/brand
 * @method post
 * @access private (only admin)
*/
module.exports.createBrandController = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Product image is required" });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);

    try {
        const { error } = validationBrand(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const imageResult = await cloudinaryUploadImage(imagePath);

        const brand = {
            name: req.body.BrandName,
            image: imageResult.imageResult.secure_url,
            imageId: imageResult.public_id
        }

        const result = await brandModel.createBrand(brand);
        if (result.exists) {
            await cloudinaryRemoveImage(imageResult.public_id);
            return res.status(403).json({ message: "Brand already exists" });
        } else if (result.success) {
            return res.status(201).json({ message: "Brand created successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }

    } catch (error) {
        console.log("Error creating brand: ", error);
        return res.status(500).json({ message: error.message });
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});



/**
 * @desc get all brands
 * @Route /api/brand
 * @method get
 * @access private
*/
module.exports.getBrandController = asyncHandler(async (req, res) => {
    const result = await brandModel.getBrand();
    res.status(200).json(result);
});


/**
 * @desc create brand
 * @Route /api/brand/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateBrandController = asyncHandler(async (req, res) => {
    const { error } = validationBrand(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const brand = {
        brandID: req.params.id,
        name: req.body.name
    }

    const result = await brandModel.updateBrand(brand);
    if (result.notFound) {
        return res.status(404).json({ message: "Brand not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Brand name update successfully" });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});


/**
 * @desc change brand image
 * @Route /api/brand/change-image/:id
 * @method put
 * @access private (only admin)
*/





/**
 * @desc delete brand
 * @Route /api/brand/:id
 * @method delete
 * @access private (only admin)
*/
module.exports.deleteBrandController = asyncHandler(async (req, res) => {
    if (req.params.id === undefined || req.params.id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const result = await brandModel.deleteBrand(req.params.id);

    switch (true) {
        case result.notFound:
            return res.status(404).json({ message: "Brand not found" });
        case result.usedInProduct:
            return res.status(409).json({ message: "Brand already used in product" });
        case result.success:
            return res.status(200).json({ message: "Brand deleted successfully" });
        default:
            return res.status(500).json({ message: "Internal server error" });
    }

});
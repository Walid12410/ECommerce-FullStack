const asyncHandler = require("express-async-handler");
const { validationBanner, validationUpdateImage } = require("../validators/bannerValidator");
const bannerModel = require("../model/banner");
const { cloudinaryRemoveImage, cloudinaryUploadImage } = require("../utils/cloudinary");
const fs = require("fs");
const moment = require('moment');
const path = require("path");


const isValidDateTime = (dateTimeString) => {
    return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss', true).isValid();
};


/**
 * @desc create banner
 * @Route /api/banner
 * @method post
 * @access private (only admin)
*/
module.exports.createNewBannerController = asyncHandler(async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "Banner image is required" });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);


    try {
        const { error } = validationBanner(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const imageResult = await cloudinaryUploadImage(imagePath);

        const banner = {
            title: req.body.Title,
            desc: req.body.Description,
            imageUrl: imageResult.secure_url,
            imageID: imageResult.public_id,
            startTime: req.body.StartDate,
            endTime: req.body.EndDate,
            isActive: req.body.IsActive,
            subCategory: req.body.SubCategoryNo
        }

        const result = await bannerModel.createBanner(banner);
        if (result.subCategoryNotFound) {
            await cloudinaryRemoveImage(imageResult.public_id);
            return res.status(404).json({ message: "SubCategory not found" });
        } else if (result.success) {
            return res.status(201).json({ message: "Banner created successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }

    } catch (error) {
        return res.status(500).json({ message: "Internal server error " ,error });
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});



/**
 * @desc get banner
 * @Route /api/banner
 * @method get
 * @access public
*/
module.exports.getAllBannerController = asyncHandler(async (req, res) => {
    const currentTime = req.query.time;

    if (!currentTime) {
        return res.status(400).json({ message: "currentTime is required" });
    }

    if (!isValidDateTime(currentTime)) {
        return res.status(400).json({ message: "Invalid date-time format. Expected format: YYYY-MM-DD HH:MM:SS" });
    }

    const result = await bannerModel.getBanners(currentTime);
    res.status(200).json(result);
});


/**
 * @desc update banner
 * @Route /api/banner/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateBannerController = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (id === undefined || id === "") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const { error } = validationBanner(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const banner = {
        title: req.body.Title,
        desc: req.body.Description,
        startTime: req.body.StartDate,
        endTime: req.body.EndDate,
        isActive: req.body.IsActive,
        subCategory: req.body.SubCategoryNo
    }

    const result = await bannerModel.updateBanner(banner);
    if (result.subCategoryNotFound) {
        return res.status(404).json({ message: "SubCategory not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Banner updated successfully" });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});



/**
 * @desc delete banner
 * @Route /api/banner/:id
 * @method delete
 * @access private (only admin)
*/
module.exports.deleteBannerController = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (id === undefined || id === "") {
        return res.status(400).json({ message: "Banner id is required" });
    }

    const checkBanner = await bannerModel.getOneBanner(req.params.id);
    if (!checkBanner) {
        return res.status(404).json({ message: "Banner not found" });
    }

    await cloudinaryRemoveImage(checkBanner.ImagePublicID);


    const result = await bannerModel.deleteBanner(req.params.id);
    if (result.notFound) {
        return res.status(404).json({ message: "Banner not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Banner deleted successfullt" });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});


/**
 * @desc update banner image
 * @Route /api/banner/update-image/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateBannerImageController = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "banner image is required" });
    }

    const imagePath = path.join(__dirname, `../image/${req.file.filename}`);

    try {
        if(!req.body.ImagePublicID){
            return res.status(400).json({message : "ImagePublicID is required"});
        }

        if (req.params.id === undefined || req.params.id === "") {
            return res.status(400).json({ message: "Product id is required" });
        }

        const bannerFound = await bannerModel.getOneBanner(req.params.id);
        if (!bannerFound) {
            return res.status(404).json({ message: "banner not found" });
        }

        await cloudinaryRemoveImage(req.body.ImagePublicID);

        const imageResult = await cloudinaryUploadImage(imagePath);

        const banner = {
            BannerID: req.params.id,
            ImageURL: imageResult.secure_url,
            ImagePublicID: imageResult.public_id
        }

        const result = await bannerModel.updateBannerImage(banner);
        if (result.notFound) {
            return res.status(404).json({ message: "banner not found" });
        } else if (result.success) {
            return res.status(200).json({ message: "Banner image updated successfully" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }

    } catch (error) {
        console.log("Error update banner image: ", error);
        return res.status(500).json({ message: error });
    } finally {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
});

const asyncHandler = require("express-async-handler");
const validationFeature = require("../validators/featureValidator");
const featureModel = require("../model/feature");
const moment = require('moment');

const isValidDateTime = (dateTimeString) => {
    return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss', true).isValid();
};


/**
 * @desc create feature
 * @Route /api/feature
 * @method post
 * @access private (only admin)
*/
module.exports.createFeatureController = asyncHandler(async (req, res) => {
    const { error } = validationFeature(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const data = {
        productNo: req.body.ProductNo,
        startDate: req.body.StartDate,
        endDate: req.body.EndDate
    }

    const result = await featureModel.createFeature(data);
    if (result.notFound) {
        return res.status(404).json({ message: "Product not found" });
    } else if (result.success) {
        return res.status(201).json({ message: "Feature created successfully" });
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});


/**
 * @desc get feature
 * @Route /api/banner
 * @method get
 * @access public
*/
module.exports.getFeatureProductController = asyncHandler(async (req, res) => {
    const { currentTime, page, limit } = req.query;

    if (!currentTime) {
        return res.status(400).json({ message: "currentTime is required" });
    }

    if (!page || !limit) {
        return res.status(400).json({ message: "Page and limit query is required" });
    }

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: "Page and limit must be numbers" });
    }

    if (!isValidDateTime(currentTime)) {
        return res.status(400).json({ message: "Invalid date-time format. Expected format: YYYY-MM-DD HH:MM:SS" });
    }

    const result = await featureModel.getFeature(currentTime, page, limit);
    return res.status(200).json(result);
});


/**
 * @desc update feaute
 * @Route /api/banner/:id
 * @method put
 * @access private (only admin)
*/
module.exports.updateFeatureController = asyncHandler(async (req, res) => {
    const { error } = validationFeature(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.params.id) {
        return res.status(400).json({ message: "Feature id is required" });
    }

    const data = {
        id: req.params.id,
        productNo: req.body.ProductNo,
        startDate: req.body.StartDate,
        endDate: req.body.EndDate
    }

    const result = await featureModel.updateFeature(data);
    if (result.notFound) {
        return res.status(404).json({ message: "Feature not found" });
    } else if (result.productNotFound) {
        return res.status(404).json({ message: "Product not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Feature updated successfully" })
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }
});


/**
 * @desc delete feaute
 * @Route /api/banner/:id
 * @method delete
 * @access private (only admin)
*/
module.exports.deleteFeatureController = asyncHandler(async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: "Feature id is required" });
    }

    const result = await featureModel.deleteFeature(req.params.id);

    if (result.notFound) {
        return res.status(404).json({ message: "Feature not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Feature deleted successfully" })
    } else {
        return res.status(500).json({ message: "Internal server error" });
    }

});
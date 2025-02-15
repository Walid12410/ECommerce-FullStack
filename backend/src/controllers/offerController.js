const asyncHandler = require("express-async-handler");
const moment = require('moment');
const offerModel = require("../model/offer");
const { validationOffer } = require("../validators/offerValidator");


const isValidDateTime = (dateTimeString) => {
    return moment(dateTimeString, 'YYYY-MM-DD HH:mm:ss', true).isValid();
};



/**
 * @desc create offer
 * @Route /api/offer
 * @method post 
 * @access private (only company)
*/
module.exports.createOfferController = asyncHandler(async (req, res) => {
    const { error } = validationOffer(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const offer = {
        productNo: req.body.ProductNo,
        discount: req.body.DiscountAmt,
        startDate: req.body.StartDate,
        endDate: req.body.EndDate
    }

    const result = await offerModel.createOffer(offer);

    if (result.notFound) {
        return res.status(404).json({ message: "Product not found" });
    } else if (result.success) {
        return res.status(201).json({ message: "Offer created successfully" });
    } else {
        return res.status(500).json({ message: "Interal Server Error" });
    }
});


/**
 * @desc get all offers
 * @Route /api/offer
 * @method get
 * @access public
*/
module.exports.getOffersController = asyncHandler(async (req, res) => {
    const { page, limit, time } = req.query;


    if (!time) {
        return res.status(400).json({ message: "currentTime is required" });
    }

    if (!isValidDateTime(time)) {
        return res.status(400).json({ message: "Invalid date-time format. Expected format: YYYY-MM-DD HH:MM:SS" });
    }

    if (!page || !limit) {
        return res.status(400).json({ message: "Page and limit query is required" });
    }

    if (isNaN(page) || isNaN(limit)) {
        return res.status(400).json({ message: "Page and limit must be numbers" });
    }

    const result = await offerModel.getOffers(time,page,limit);

    res.status(200).json(result);
});


/**
 * @desc get one offer
 * @Route /api/offer/:id
 * @method get
 * @access public
*/
module.exports.getOfferController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id === undefined || id === "") {
        return res.status(400).json({ message: "Offer id is required" });
    }

    const result = await offerModel.getOneOffer(id);
    return res.status(200).json(result);
});


/**
 * @desc update offer
 * @Route /api/offer/:id
 * @method put 
 * @access private (only company)
*/
module.exports.updateOfferController = asyncHandler(async (req, res) => {
    const { error } = validationOffer(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;

    if (id === undefined || id === "") {
        return res.status(400).json({ message: "Offer id is required" });
    }

    const offer = {
        id: id,
        productNo: req.body.ProductNo,
        discount: req.body.DiscountAmt,
        startDate: req.body.StartDate,
        endDate: req.body.EndDate
    }

    const result = await offerModel.updateOffer(offer);

    if (result.notFound) {
        return res.status(404).json({ message: "Offer not found" });
    } else if (result.productNotFound) {
        return res.status(400).json({ message: "Product not found" });
    } else if (result.success) {
        return res.status(201).json({ message: "Offer created successfully" });
    } else {
        return res.status(500).json({ message: "Interal Server Error" });
    }
});


/**
 * @desc delete offer
 * @Route /api/offer/:id
 * @method delete 
 * @access private (only company)
*/
module.exports.deleteOfferController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (id === undefined || id === "") {
        return res.status(400).json({ message: "Offer id is required" });
    }

    const result = await offerModel.deleteOffer(id);
    if (result.notFound) {
        return res.status(404).json({ message: "Offer not found" });
    } else if (result.success) {
        return res.status(200).json({ message: "Offer deleted successfully" });
    } else {
        return res.status(500).json({ message: "Interal Server Error" });
    }
})
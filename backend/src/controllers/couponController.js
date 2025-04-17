const asyncHandler = require("express-async-handler");
const couponModel = require("../model/coupon");
const { validationCoupon, validationUpdateCoupon } = require("../validators/couponValidator");

/**
 * @desc Get all coupons
 * @Route /api/coupon
 * @method get
 * @access public
 */
const getAllCouponsController = asyncHandler(async (req, res) => {
    try {
        const coupons = await couponModel.getAllCoupons();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Get coupon by code
 * @Route /api/coupon/:code
 * @method get
 * @access public
 */
const getCouponByCodeController = asyncHandler(async (req, res) => {
    try {
        const { code } = req.params;
        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        const coupon = await couponModel.getCouponByCode(code);
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Get coupons by company
 * @Route /api/coupon/company/:companyNo
 * @method get
 * @access public
 */
const getCouponsByCompanyController = asyncHandler(async (req, res) => {
    try {
        const { companyNo } = req.params;
        if (!companyNo) {
            return res.status(400).json({ message: "Company number is required" });
        }

        const coupons = await couponModel.getCouponsByCompany(companyNo);
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Check coupon validity
 * @Route /api/coupon/check/:code
 * @method get
 * @access public
 */
const checkCouponValidityController = asyncHandler(async (req, res) => {
    try {
        const { code } = req.params;
        const { currentTime } = req.query;

        if (!code) {
            return res.status(400).json({ message: "Coupon code is required" });
        }

        if (!currentTime) {
            return res.status(400).json({ message: "Current time is required" });
        }

        const coupon = await couponModel.checkCouponValidity(code, currentTime);
        if (!coupon) {
            return res.status(404).json({ message: "Invalid or expired coupon" });
        }

        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Create new coupon
 * @Route /api/coupon
 * @method post
 * @access private (only company)
 */
const createCouponController = asyncHandler(async (req, res) => {
    try {
        // Validate coupon data
        const { error } = validationCoupon(req.body);
        if (error) {
            return res.status(400).json({ 
                message: "Validation error", 
                errors: error.details.map(detail => detail.message) 
            });
        }

        const coupon = {
            CompanyNo: req.user.CompanyNo,
            Code: req.body.Code,
            Savings: req.body.Savings,
            MinOrderValue: req.body.MinOrderValue,
            StartDate: req.body.StartDate,
            ExpiryDate: req.body.ExpiryDate
        };

        const result = await couponModel.createCoupon(coupon);
        
        if (result.exists) {
            return res.status(400).json({ message: "Coupon code already exists" });
        } else if (result.success) {
            return res.status(201).json({ message: "Coupon created successfully" });
        } else {
            return res.status(500).json({ message: "Failed to create coupon" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Update coupon
 * @Route /api/coupon/:id
 * @method put
 * @access private (only company)
 */
const updateCouponController = asyncHandler(async (req, res) => {
    try {
        const { error } = validationUpdateCoupon(req.body);
        if (error) {
            return res.status(400).json({ 
                message: "Validation error", 
                errors: error.details.map(detail => detail.message) 
            });
        }

        if (!req.params.id) {
            return res.status(400).json({ message: "Coupon ID is required" });
        }

        const coupon = {
            CouponNo: req.params.id,
            CompanyNo: req.user.CompanyNo,
            Code: req.body.Code,
            Savings: req.body.Savings,
            MinOrderValue: req.body.MinOrderValue,
            StartDate: req.body.StartDate,
            ExpiryDate: req.body.ExpiryDate
        };

        const result = await couponModel.updateCoupon(coupon);
        
        if (result.notFound) {
            return res.status(404).json({ message: "Coupon not found" });
        } else if (result.exists) {
            return res.status(400).json({ message: "Coupon code already exists" });
        } else if (result.success) {
            return res.status(200).json({ message: "Coupon updated successfully" });
        } else {
            return res.status(500).json({ message: "Failed to update coupon" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc Delete coupon
 * @Route /api/coupon/:id
 * @method delete
 * @access private (only company)
 */
const deleteCouponController = asyncHandler(async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Coupon ID is required" });
        }

        const result = await couponModel.deleteCoupon(req.params.id, req.user.CompanyNo);

        if (result.notFound) {
            return res.status(404).json({ message: "Coupon not found" });
        } else if (result.success) {
            return res.status(200).json({ message: "Coupon deleted successfully" });
        } else {
            return res.status(500).json({ message: "Failed to delete coupon" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    getAllCouponsController,
    getCouponByCodeController,
    getCouponsByCompanyController,
    checkCouponValidityController,
    createCouponController,
    updateCouponController,
    deleteCouponController
}; 
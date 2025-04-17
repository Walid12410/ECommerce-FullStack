const express = require("express");
const router = express.Router();
const {
    getAllCouponsController,
    getCouponByCodeController,
    getCouponsByCompanyController,
    checkCouponValidityController,
    createCouponController,
    updateCouponController,
    deleteCouponController
} = require("../controllers/couponController");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");

// Public routes
router.get("/", getAllCouponsController);
router.get("/:code", getCouponByCodeController);
router.get("/company/:companyNo", getCouponsByCompanyController);
router.get("/check/:code", checkCouponValidityController);

// Protected routes (company only)
router.post("/", verifyCompanyToken, createCouponController);
router.put("/:id", verifyCompanyToken, updateCouponController);
router.delete("/:id", verifyCompanyToken, deleteCouponController);

module.exports = router; 
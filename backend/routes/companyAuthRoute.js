const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");
const { createCompanyUserController,
    loginCompanyUserController,
    logoutCompanyUserController,
    checkCompanyAuthController
} = require("../controllers/companyAuthController");

const router = require("express").Router();


// api/company-auth/register
router.post("/register", verifyTokenAndAdmin, createCompanyUserController);

// api/company-auth/login
router.post("/login", loginCompanyUserController);

// api/company-auth/logout
router.post("/logout", logoutCompanyUserController);

// api/company-auth/check
router.get("/check", verifyCompanyToken, checkCompanyAuthController);

module.exports = router;
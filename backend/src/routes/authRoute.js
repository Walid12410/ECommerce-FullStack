const { registerUserController,
    loginUserController,
    logoutUserController,
    checkAuthController,
    loginAdminController
} = require("../controllers/authController");
const { verifyToken } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/auth/register
router.post("/register", registerUserController);

// api/auth/login
router.post("/login", loginUserController);

// api/auth/login-admin
router.post("/login-admin", loginAdminController);

// api/auth/logout
router.post("/logout", logoutUserController);

// api/auth/check
router.get("/check",verifyToken, checkAuthController);


module.exports = router;
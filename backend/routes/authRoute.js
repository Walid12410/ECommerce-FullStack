const { registerUserController, loginUserController } = require("../controllers/authController");
const router = require("express").Router();


// api/auth/register
router.post("/register",registerUserController)

// api/auth/login
router.post("/login",loginUserController)

module.exports = router;
const { getAllUserController,
    updateUserProfileController,
    countUserController,
    changePasswordController
} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/user/:id
router.put("/:id",verifyTokenAndOnlyUser,updateUserProfileController)

// api/user/change-password
router.put("/change-password",verifyTokenAndOnlyUser,changePasswordController)

// api/user
router.get("/",verifyTokenAndAdmin,getAllUserController)

// api/user/count
router.get("/count",verifyTokenAndAdmin,countUserController)

module.exports = router;

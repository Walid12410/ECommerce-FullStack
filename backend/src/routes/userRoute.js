const { getAllUserController,
    updateUserProfileController,
    countUserController
} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/user/:id
router.put("/:id",verifyTokenAndOnlyUser,updateUserProfileController)

// api/user
router.get("/",verifyTokenAndAdmin,getAllUserController)

// api/user/count
router.get("/count",verifyTokenAndAdmin,countUserController)

module.exports = router;

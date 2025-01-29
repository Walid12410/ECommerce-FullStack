const { getAllUserController, updateUserProfileController } = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/user/:id
router.put("/:id",verifyTokenAndOnlyUser,updateUserProfileController)

// api/user
router.get("/",verifyTokenAndAdmin,getAllUserController)


module.exports = router;

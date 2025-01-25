const { getAllUserController, updateUserProfileController } = require("../controllers/userController");
const { verifyTokenAndAdmin, verfiyTokenAndOnlyUser } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/user/:id
router.put("/:id",verfiyTokenAndOnlyUser,updateUserProfileController)

// api/user
router.get("/",verifyTokenAndAdmin,getAllUserController)


module.exports = router;

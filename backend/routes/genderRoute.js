const { createGenderController,
    getGenderController,
    updateGenderController,
    deleteGenderController
} = require("../controllers/genderController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/gender
router.route("/")
    .post(verifyTokenAndAdmin, createGenderController)
    .get(getGenderController);

// api/gender/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateGenderController)
    .delete(verifyTokenAndAdmin, deleteGenderController);


module.exports = router;

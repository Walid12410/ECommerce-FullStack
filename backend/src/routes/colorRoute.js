const { getColorController,
    createColorController, 
    updateColorController, 
    deleteColorController 
} = require("../controllers/colorController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/color
router.route("/")
    .post(verifyTokenAndAdmin, createColorController)
    .get(getColorController);

// api/color/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateColorController)
    .delete(verifyTokenAndAdmin, deleteColorController);


module.exports = router;

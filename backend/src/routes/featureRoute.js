const { createFeatureController,
    getFeatureProductController,
    updateFeatureController,
    deleteFeatureController
} = require("../controllers/featureController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/feature
router.route("/")
    .post(verifyTokenAndAdmin, createFeatureController)
    .get(getFeatureProductController);


// api/feature/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateFeatureController)
    .delete(verifyTokenAndAdmin, deleteFeatureController);


module.exports = router;

const { createBrandController,
    getBrandController,
    updateBrandController,
    deleteBrandController,
    changeBrandImageController
} = require("../controllers/brandController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();
const photoUpload = require("../middlewares/photoStorage");


// api/brand
router.route("/")
    .post(verifyTokenAndAdmin, photoUpload.single("image"), createBrandController)
    .get(getBrandController);

// api/brand/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateBrandController)
    .delete(verifyTokenAndAdmin, deleteBrandController);

// api/brand/change-image/:id
router.route("/change-image/:id")
    .put(verifyTokenAndAdmin, photoUpload.single("image"), changeBrandImageController);

module.exports = router;

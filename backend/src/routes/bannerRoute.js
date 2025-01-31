const { createNewBannerController,
    getAllBannerController,
    updateBannerController,
    deleteBannerController,
    updateBannerImageController
} = require("../controllers/bannerController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const photoUpload = require("../middlewares/photoStorage");
const router = require("express").Router();

// api/banner
router.route("/")
    .post(verifyTokenAndAdmin, photoUpload.single("image"), createNewBannerController)
    .get(getAllBannerController);


// api/banner/:id
router.route("/:id")
    .put(verifyTokenAndAdmin, updateBannerController)
    .delete(verifyTokenAndAdmin, deleteBannerController);

// api/banner/update-image/:id
router.route("/update-image/:id")
    .put(verifyTokenAndAdmin, photoUpload.single("image"), updateBannerImageController);


module.exports = router;

const { createProductController,
    getProductsController,
    getOneProductController,
    updateProductController,
    updateProductImageController
} = require("../controllers/productController");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");
const photoUpload = require("../middlewares/photoStorage");
const router = require("express").Router();

// api/product
router.route("/")
    .post(verifyCompanyToken, photoUpload.single("image"), createProductController)
    .get(getProductsController);

// api/product/:id
router.route("/:id")
    .get(getOneProductController)
    .put(verifyCompanyToken, updateProductController);

// api/product/update-image/:id
router.route("/update-image/:id")
    .put(verifyCompanyToken, photoUpload.single("image"), updateProductImageController);

module.exports = router;

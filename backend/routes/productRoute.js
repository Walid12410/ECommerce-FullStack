const { createProductController, 
    getProductsController, 
    getOneProductController,
    updateProductController,
    updateProductImageController
} = require("../controllers/productController");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");
const router = require("express").Router();


// api/product
router.route("/")
    .post(verifyCompanyToken,createProductController)
    .get(getProductsController);

// api/product/:id
router.route("/:id")
    .get(getOneProductController)
    .put(verifyCompanyToken,updateProductController);

// api/product/update-image/:id
router.route("/update-image/:id").put(verifyCompanyToken,updateProductImageController);

module.exports = router;

const { createProductSizeController,
    getAllProductSizeController, 
    updateProductSizeController,
    deleteProductSizeController
} = require("../controllers/productSizeController");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");
const router = require("express").Router();



// api/product-size
router.route("/")
    .post(verifyCompanyToken, createProductSizeController)
    .get(getAllProductSizeController);

// api/product-size/:id
router.route("/:id")
    .put(verifyCompanyToken, updateProductSizeController)
    .delete(verifyCompanyToken, deleteProductSizeController);

    
module.exports = router;

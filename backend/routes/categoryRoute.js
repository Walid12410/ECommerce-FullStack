const { createNewCategoryController,
    updateCategoryController,
    deleteCategoryController, 
    getCategoryAndSubCategoryController,
    getAllCategoryController
} = require("../controllers/categoryController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/category
router.route("/")
    .post(verifyTokenAndAdmin,createNewCategoryController)
    .get(getAllCategoryController);

router.route("/subcategory")
    .get(getCategoryAndSubCategoryController);

// api/category/:id
router.route("/:id")
    .put(verifyTokenAndAdmin,updateCategoryController)
    .delete(verifyTokenAndAdmin,deleteCategoryController);


module.exports = router;

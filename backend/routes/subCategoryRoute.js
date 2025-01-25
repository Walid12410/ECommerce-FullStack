const { createNewSubCategoryController,
    getAllSubCategoryController,
    updateSubCategoryController
} = require("../controllers/subCategoryController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();


// api/sub-category
router.route("/")
    .post(verifyTokenAndAdmin,createNewSubCategoryController)
    .get(getAllSubCategoryController);


// api/sub-category
router.route("/:id")
    .put(verifyTokenAndAdmin,updateSubCategoryController);


module.exports = router;

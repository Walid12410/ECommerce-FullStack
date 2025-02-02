const { createNewCompanyController,
    getAllCompanyController,
    updateCompanyController
} = require("../controllers/companyController");
const { verifyTokenAndAdmin } = require("../middlewares/checkToken");
const router = require("express").Router();
const photoUpload = require("../middlewares/photoStorage");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");


// api/company
router.route("/")
    .post(verifyTokenAndAdmin, photoUpload.single("image"), createNewCompanyController)
    .get(getAllCompanyController);

// api/company/:id
router.route("/:id")
    .put(verifyCompanyToken, updateCompanyController);


module.exports = router;

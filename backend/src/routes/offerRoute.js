const { getOffersController,
    getOfferController,
    updateOfferController, 
    deleteOfferController,
    createOfferController
} = require("../controllers/offerController");
const verifyCompanyToken = require("../middlewares/checkCompanyToken");
const router = require("express").Router();

// api/offer
router.route("/")
    .post(verifyCompanyToken, createOfferController)
    .get(getOffersController);

// api/offer/:id
router.route("/:id")
    .get(getOfferController)
    .put(verifyCompanyToken, updateOfferController)
    .delete(verifyCompanyToken, deleteOfferController);


module.exports = router;

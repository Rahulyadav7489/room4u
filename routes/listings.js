const express= require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync");
const Listing= require("../models/listing.js");
const {isLoggedIn, saveRedirectUrl, isOwner}= require("../middleware.js")
const listingController= require("../controller/listings.js"); 
const multer= require("multer");
const {storage}= require("../cloudinary/index.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        saveRedirectUrl,
        isLoggedIn,
        upload.single("image"),  // This processes file upload
        wrapAsync(listingController.addNewListing)
    );

    
router
    .route("/new")
    .get(saveRedirectUrl, isLoggedIn , listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync (listingController.showListing))
    .put(saveRedirectUrl, isLoggedIn, isOwner, upload.single("image") ,wrapAsync(listingController.updateListing))
    .delete(saveRedirectUrl, isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

router
    .route("/:id/edit")
    .get(saveRedirectUrl, isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const reviewController= require("../controller/reviews.js");
const { isLoggedIn, isReviewAuthor, isReviewOwner } = require("../middleware.js");

router
  .route("/:id/reviews")
  .post(isLoggedIn, wrapAsync(reviewController.postReview));

router
  .route("/:id/reviews/:revId")
  .delete(isLoggedIn, isReviewOwner  , wrapAsync(reviewController.destroyReview));

module.exports = router;
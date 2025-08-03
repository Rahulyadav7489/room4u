const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.postReview= async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const listing = await Listing.findById(id);
    
    const newReview = new Review({
      rating: rating,
      comment: comment,
      author: req.user._id
    });
    console.log(newReview);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "Review added successfully");
    res.redirect(`/listings/${id}`);
  }

module.exports.destroyReview= async (req, res) => {
    const { id, revId } = req.params;
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: revId } });
    await Review.findByIdAndDelete(revId);
    
    req.flash("success", "Review deleted successfully");
    res.redirect(`/listings/${id}`);
}
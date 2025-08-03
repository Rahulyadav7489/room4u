const Listing= require("./models/listing.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn =(req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error", "Login required");
        return res.redirect("/login");
    }
    next();
} 

module.exports.saveRedirectUrl = (req, res, next)=> {
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next(); 
}

module.exports.isOwner=  async (req, res, next)=>{
    let {id}=req.params;
    let listing =  await Listing.findById(id);
    
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" ,"You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewOwner= async (req, res, next)=>{
    let {id, revId}=req.params;
    let rev =  await Review.findById(revId);
    
    if(!rev.author.equals(res.locals.currUser._id)){
        req.flash("error" ,"You are not the author of this review");
        return res.redirect(`/listings/${id}`);
        console.log("not the owner of review");
    }
    next();
}
const Listing= require("../models/listing.js");
const fetch = require("node-fetch");

module.exports.index= async (req,res)=>{
    let listings = await Listing.find({}); 
    res.render("listings/index.ejs", {listings})
};

module.exports.renderNewForm= (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id}=req.params;
    let list= await Listing.findById(id)
                           .populate({path: "reviews",populate: {path: "author"}})
                           .populate("owner");
  
    if(!list){
        req.flash("error", "listing you search for doen't exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{list});
};

module.exports.addNewListing = async (req, res) => {

    const lisitingData = req.body.Listing;
    const locationQuery = lisitingData.location;
    const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`);
    const geoData = await geoResponse.json();

    const newListing = new Listing(lisitingData);

    if (geoData && geoData.length > 0) {
    newListing.coordinates = {
      lat: parseFloat(geoData[0].lat),
      lng: parseFloat(geoData[0].lon)
    };
  }
  console.log(newListing);

    // Save image details from Cloudinary
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    newListing.owner = req.user._id;

    await newListing.save();

    req.flash("success", "New listing created successfully");
    return res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);

    let originalImageUrl = list.image.url;
    // Assign the modified URL to a new variable
    let transformedImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");

    res.render("listings/edit.ejs", { list, originalImageUrl: transformedImageUrl });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listingData = req.body.Listing;

  const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listingData.location)}`);
  const geoData = await geoResponse.json();

  const listing = await Listing.findByIdAndUpdate(id, listingData);

  if (geoData && geoData.length > 0) {
    listing.coordinates = {
      lat: parseFloat(geoData[0].lat),
      lng: parseFloat(geoData[0].lon)
    };
  }

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing= async (req,res)=>{
    let {id}=req.params;
    let deletedList=await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully")
    return res.redirect("/listings");
};
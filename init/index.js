const mongoose= require("mongoose");
const Listing = require('../models/listing');

main().then( ()=>{
    console.log("connected to db successfully");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/wanderlust');
}

// const sampleListings = [
//   {
//     title: "Cozy Mountain Cabin",
//     description: "A peaceful retreat in the mountains.",
//     price: 2500,
//     location: "Manali",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
//   },
//   {
//     title: "Beachside Bungalow",
//     description: "Steps from the ocean with stunning views.",
//     price: 3000,
//     location: "Goa",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1505692794403-34cb0d982f28"
//   },
//   {
//     title: "Urban Loft",
//     description: "Modern living in the heart of the city.",
//     price: 2200,
//     location: "Mumbai",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1600585153837-ffa7f79e629d"
//   },
//   {
//     title: "Rustic Farmhouse",
//     description: "Reconnect with nature in this charming home.",
//     price: 1800,
//     location: "Udaipur",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
//   },
//   {
//     title: "Luxury Villa",
//     description: "Experience ultimate luxury and comfort.",
//     price: 8000,
//     location: "Jaipur",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
//   },
//   {
//     title: "Lakeside Cottage",
//     description: "Watch the sunset by the lake.",
//     price: 1900,
//     location: "Nainital",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
//   },
//   {
//     title: "Hilltop Haven",
//     description: "Cool breezes and great views await.",
//     price: 2100,
//     location: "Darjeeling",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914"
//   },
//   {
//     title: "Desert Retreat",
//     description: "An oasis of calm in the dunes.",
//     price: 1700,
//     location: "Jaisalmer",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1600585153750-b2bc6ea86dba"
//   },
//   {
//     title: "Countryside Villa",
//     description: "Surrounded by green fields and quiet roads.",
//     price: 2000,
//     location: "Punjab",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1622657621029-3cfd40f770c1"
//   },
//   {
//     title: "Snowy Escape",
//     description: "A cozy stay in a snowy wonderland.",
//     price: 2600,
//     location: "Shimla",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1549187774-b4e9b0445b06"
//   },
//   {
//     title: "Modern Apartment",
//     description: "Compact and smart living spaces.",
//     price: 2400,
//     location: "Bangalore",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1613977257364-6e16e4f5e0e3"
//   },
//   {
//     title: "Tropical Hideaway",
//     description: "Palm trees and peace all around.",
//     price: 2700,
//     location: "Kerala",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1584291527938-94f56fbd95b4"
//   },
//   {
//     title: "Heritage Home",
//     description: "Old-world charm with modern comfort.",
//     price: 2300,
//     location: "Kolkata",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb"
//   },
//   {
//     title: "Treehouse Adventure",
//     description: "Live among the trees in style.",
//     price: 3100,
//     location: "Meghalaya",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
//   },
//   {
//     title: "Clifftop Home",
//     description: "Dramatic views and high vibes.",
//     price: 3500,
//     location: "Varkala",
//     country: "India",
//     image: "https://images.unsplash.com/photo-1559599189-95e48d23476f"
//   }
// ];

async function insert() {
    try {
        // Clear all existing listings
        await Listing.deleteMany({});
        
        // Add owner to each listing
        const updatedListings = sampleListings.map(obj => ({
            ...obj,
            owner: '683274ad1acd608de2ea56dd'
        }));

        // Insert the updated listings
        await Listing.insertMany(updatedListings);

        console.log("Sample listings inserted successfully.");
    } catch (err) {
        console.error("Error inserting sample listings:", err);
    }
}


insert();
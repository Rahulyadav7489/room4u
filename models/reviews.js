const mongoose = require("mongoose");

main().then( ()=>{
    console.log("connected to db successfully");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/wanderlust');
}


const reviewSchema = new mongoose.Schema( {

    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Review", reviewSchema);

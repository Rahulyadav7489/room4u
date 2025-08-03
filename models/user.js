const mongoose = require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

main().then( ()=>{
    console.log("connected to db successfully");
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/wanderlust');
}

//username and password are automatically defined by passport-local-mongoose
let userSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports= mongoose.model("User", userSchema);

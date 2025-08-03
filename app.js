require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const session= require("express-session"); 
const flash= require("connect-flash");
const passport = require("passport");
const localStrategy= require("passport-local");
const User= require("./models/user.js");

const dbUrl= process.env.ATLASDB_URL;

const path=require("path"); 
const methodOverride=require("method-override");
const { exitCode } = require("process");
const ejsMate=require("ejs-mate");
let app=express();

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
};
 
app.use(session(sessionOptions));
app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( (req, res, next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser= req.user;
    next(); 
});

const listingRouter= require("./routes/listings.js");
const reviewRouter= require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
 
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

main().then( ()=>{
    console.log("connected to db successfully");
});


async function main() {
    await mongoose.connect(dbUrl);
}

app.use("/listings",  listingRouter);
app.use("/listings", reviewRouter);
app.use("/", userRouter);

// app.use("/", (req, res)=>{
//     res.send("home route")
// });

app.use((req,res,next)=>{
    const err = new Error("Page Not Found");
    err.status = 404;
    next(err);
}); 

app.use( (err, req, res, next)=>{
    const {status=500, message="something went wrong"}=err;
    res.render("error.ejs", {err});
}); 


app.listen(8080, ()=>{
    console.log("server started at port 8080");
}); 
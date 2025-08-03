const express= require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync");
const user= require("../models/user.js");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController= require("../controller/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm )
    .post(wrapAsync(userController.addUserToDB));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, userController.loginUser);

router
    .route("/logout")
    .get(userController.logoutUser);

module.exports= router;
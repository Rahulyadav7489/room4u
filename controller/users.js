const user= require("../models/user.js");
const passport= require("passport");


module.exports.renderSignupForm= (req, res)=>{
    res.render("users/signup.ejs");
}

module.exports.addUserToDB = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new user({ email, username });
    const registerUser = await user.register(newUser, password);
    req.login(registerUser, (err) => {
      if (err) return next(err); // ✅ next is now passed in
      req.flash("success", "User registered successfully");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/signup");
  } 
}

module.exports.renderLoginForm= (req, res)=>{
    res.render("users/login.ejs");
}

module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome back to Wanderlust!");

      // ✅ Fix begins here:
      const redirectUrl = req.session.redirectUrl || "/listings";
      delete req.session.redirectUrl;

      return res.redirect(redirectUrl);
    });
  })(req, res, next);
};


module.exports.logoutUser= (req, res, next)=>{
      req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings"); 
      });
}
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
require("dotenv").config();

const User = require("../models/user"); // Adjust based on your project

const router = express.Router();

// ✅ Configure Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("🔹 Google OAuth Callback Triggered:", profile.displayName);

        // Check if user exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          console.log("🆕 New User Detected! Creating Profile...");
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("❌ Error in Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// ✅ Serialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// ✅ Google Login Route
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// ✅ Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login.html" }),
  (req, res) => {
    console.log("✅ Google Authentication Successful");
    req.session.token = req.user.id; // Store session token
    res.redirect("/index.html"); // Redirect to main dashboard
  }
);

// ✅ Logout Route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.error("❌ Logout Error:", err);
    
    req.session.destroy(() => {
      res.clearCookie("connect.sid", { path: "/" }); // Properly clear session cookie
      console.log("👋 User Logged Out");
      res.redirect("/login.html");
    });
  });
});

module.exports = router;

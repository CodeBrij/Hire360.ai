const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// 🔹 Verify Google Access Token & Authenticate User
router.post("/google-login", async (req, res) => {
    try {
        const { token } = req.body;

        // ✅ Verify access token using Google's API
        const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
        const payload = await googleRes.json();

        if (!payload || !payload.email) {
            return res.status(400).json({ msg: "Invalid Google token" });
        }

        // Check if user exists in DB
        let user = await User.findOne({ email: payload.email });

        if (!user) {
            user = new User({
                googleId: payload.sub, // Google user ID
                name: payload.name,
                email: payload.email,
            });
            await user.save();
        }

        // Generate JWT Token
        const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token: jwtToken, user });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
});
// 🔹 Configure Passport.js Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: "google-auth", // No password needed for Google accounts
                googleId: profile.id
            });
            await user.save();
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        done(null, { user, token });
    } catch (error) {
        done(error, null);
    }
}));

// 🔹 Google Auth Route (Redirect to Google)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 🔹 Google Auth Callback
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    const { user, token } = req.user;
    res.json({ token, user });
});


module.exports = router;

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenCache = require("../config/cacheConfig");
const sendVerifyEmail = require("../emails/VerifyEmail");
const { v4: uuidv4 } = require('uuid');
const welcomeEmail = require("../emails/WelcomeEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields (firstName, lastName, email, password) are present and a valid email, password is at least 6 characters long
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const user = await User.exists({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token and link for email verification
    const verificationToken = uuidv4();
    const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    // Initialize user data
    const userData = {
      name,
      email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      emailVerificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    // Create user in the database
    await User.create(userData);

    // Send verification email
    await sendVerifyEmail({
      name,
      email,
      link: verificationLink,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      });
    }

    // Check if user exists and get password in one query
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User does not exist",
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // Check if email is verified before logging in 
    if (!user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        error: "Please verify your email first then try to login",
      });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'None' for cross-origin, 'Lax' for local
      path: "/", // Accessible across all routes
    });

    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// logout user
exports.logout = async (req, res) => {
  try {
    token = req.cookies.token;
    tokenCache.del(token);
    // Clear cookie
    res.clearCookie("token");

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Check if token is valid
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Update user data
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpiresAt = undefined;

    await user.save();
    // Send welcome email
    await welcomeEmail({
      name: user.name,
      email: user.email,
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

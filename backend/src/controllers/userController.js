const User = require("../models/UserModel");
const tokenCache = require("../config/cacheConfig");

// get the user profile
exports.getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }

    // Check if data exists in cache
    const cachedUser = tokenCache.get(token);
    if (cachedUser) {
      return res.status(200).send(cachedUser);
    }

    // If not in cache, fetch from database
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Store in cache using token as key
    tokenCache.set(token, user);

    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

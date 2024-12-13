const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Access the token from cookies
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Verify JWT and get user info
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

module.exports = auth;
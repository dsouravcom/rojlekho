const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./src/config/DBConnect");
var cookieParser = require('cookie-parser')

// Import routes
const authRoutes = require("./src/routes/authRoute");
const userRoutes = require("./src/routes/userRoute");
const postRoutes = require("./src/routes/journalRoute");
const orderRoutes = require("./src/routes/orderRoute");


const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(helmet());

// Connect to MongoDB --------------------------------------------------------
connectDB();
// ---------------------------------------------------------------------------

// Configure CORS for specific IP and localhost
const allowedOrigins = process.env.WHITELISTED_DOMAINS;
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (if needed)
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};

// Apply CORS middleware globally to all routes
app.use((req, res, next) => {
  const excludeRoutes = ["/api/test"]; // You can include routes that don't use Whitelisted domains.
  if (excludeRoutes.includes(req.path)) {
    cors()(req, res, next);
  } else {
    cors(corsOptions)(req, res, next);
  }
});

// Routes defined -------------------------------------------------------------------------
// Test API route
router.get("/api/test", (req, res) => {
  res.json({ message: "Roj Lekho API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/order", orderRoutes);
// ----------------------------------------------------------------------------------------

app.listen(port, () => {
  console.log(`RojLekho app listening on port ${port}`);
});

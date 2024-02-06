const express = require('express')
const router = require('./routes/routes.js')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const morgan = require ('morgan')
const helmet = require('helmet')


const app = express()
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(helmet())


// Configure CORS for specific IP and localhost
const allowedOrigins = process.env.WHITELISTED_DOMAINS;
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable credentials (if needed)
  optionsSuccessStatus: 204, // Respond with a 204 status for preflight requests
};

// app.use(cors(corsOptions));
app.use((req, res, next) => {
  cors(corsOptions)(req, res, (err) => {
    if (err) {
      // Handle CORS error
      res.status(err.status || 500).json({ error: err.message });
    } else {
      // Continue with the next middleware
      next();
    }
  });
});


try{
  mongoose.connect(process.env.DATABASE_URL)
  console.log('MongoDB connected successfully');
  }catch(error){
    console.error(error);
  }

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

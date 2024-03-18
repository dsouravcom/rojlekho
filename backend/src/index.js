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

// Apply CORS middleware globally to all routes 
app.use((req, res, next) => {
  const excludeRoutes = ['/api/test']; // You can include routes that don't use Whitelisted domains.
  if (excludeRoutes.includes(req.path)) {
    cors()(req, res, next);
  } else {
    cors(corsOptions)(req, res, next);
  }
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

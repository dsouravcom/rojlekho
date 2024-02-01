const express = require('express')
const router = require('./routes/routes.js')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()



const app = express()
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


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

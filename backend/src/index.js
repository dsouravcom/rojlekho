const express = require('express')
const router = require('./routes/routes.js')
const cors = require('cors')


const app = express()
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

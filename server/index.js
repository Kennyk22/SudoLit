const express = require('express')
const cors = require('cors')
const router = require('./router')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT

const corsConfig = {
  origin: ' http://localhost:3000',
  credentials: true
}

const app = express()

app.use(cors(corsConfig))
app.use(express.json())

app.use(router)

app.listen(port, () => {
  console.log(`server running on port SECRET`)
})

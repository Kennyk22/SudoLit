const express = require('express')
const cors = require('cors')
const router = require('./router')

const corsConfig = {
    origin: ' http://localhost:3000',
    credentials: true
}

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

app.use(router)

app.listen('3001', () => {
    console.log('server running on port 3001')
})

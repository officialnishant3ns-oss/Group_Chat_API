import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
const app = express()
const PORT = process.env.PORT || 6000
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
app.use(express.static('public'))

app.get('/v1',(req,res)=>{
    res.sendFile('index.html', { root: 'public' })
})

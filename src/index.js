import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
const app = express()
const PORT = process.env.PORT || 6000
const server = http.createServer(app)
import { Server } from "socket.io";


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
app.use(express.static('public'))

app.get('/v1',(req,res)=>{
    res.sendFile('index.html', { root: 'public' })
})

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('New client connected')  
    socket.on('message', (data) => {
        console.log('Message received:', data)
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })   
})

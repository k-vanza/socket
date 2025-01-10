import express from 'express'
import { Server } from 'socket.io';
import {createServer} from 'http'
import cors from 'cors'

const app = express()

const port = 3000
//creating a server
const server = new createServer(app)
//creating a instance of server named io
const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
})
//now we want to listen hence we use on and if we wanted to send some data then we use emit
//here we are using on means the server will listen
io.on("connection", (socket) => {
    console.log("user connected")
    console.log("Id",socket.id)
})

app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("hello")
});

server.listen(port,() => {
    console.log(`server is running on port ${port}`)
})
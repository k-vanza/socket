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
    console.log("user connected", socket.id)

    //the below line will send a message to a particular user
    socket.emit("welcome", `welcome to the server, ${socket.id}`);

    //the below line will broadcast a message to every user 
    socket.broadcast.emit("welcome", `${socket.id} joined the server`)

    //the below statement means when we get a "message" from the frontend we will console log it
    // socket.on("message", (data) => {
    //     console.log(data);
    //     io.emit("receive-message",data)
    //     //socket.broadcast.emit("receive-message", data)
    // })

    socket.on("message", (room, message) => {
        console.log({room, message});
        io.to(room).emit("receive-message",message)
        //socket.broadcast.emit("receive-message", data)
    })

    //the below line will show how to disconnect a user
    //now in order to disconnect the user will be unmounted and we need to pass a cleanup function in the useEfect
    //the disconnect will come from client side which is used in useEffect
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
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
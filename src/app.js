const port = 3000;

const express = require("express");
const app = express();

const http = require('http')
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server)

const path = require("node:path")

let id = 0
io.on("connection",(socket)=>{
    id+=1
    let _id = id
    console.log("new connection! ",_id)

    socket.on("disconnect",()=>{
        console.log("connection left :( ",_id)
    })

    socket.on("message",(msg)=>{
        if (!msg) return;
        console.log("user ",_id, " said ",msg)
    })
})
app.get("/",(req,res,next)=>{
    res.redirect("/chat");
})
app.get("/chat",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'chat.html'));
})

server.listen(port,e=>{
    if (e){
        return console.error(`Error occured: `,e)
    }
    console.log("Hosting on port 3000")
})
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

    socket.on("message",(_msg)=>{
        console.log(_msg)
        let msg = _msg.message
        let local_id = _msg.local_id
        if (!msg || !local_id){
            return socket.emit("response",{type:"error",id:_id})
        }

        console.log("user ",_id, " said ",msg)
        socket.broadcast.emit("message",{type:"message",message:msg,id:_id})
        socket.emit("response",{type:"success",id:local_id})
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
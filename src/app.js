const express = require("express");
const app = express();

const path = require("node:path")

app.get("/",(req,res,next)=>{
    res.redirect("/chat")
})
app.get("/chat",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'chat.html'))
})
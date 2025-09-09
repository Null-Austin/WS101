const port = 3000;

const express = require("express");
const app = express();

const path = require("node:path")

app.get("/",(req,res,next)=>{
    res.redirect("/chat");
})
app.get("/chat",(req,res,next)=>{
    res.sendFile(path.join(__dirname,'chat.html'));
})

app.listen(port,e=>{
    if (e){
        return console.error(`Error occured: `,e)
    }
    console.log("Hosting on port 3000")
})
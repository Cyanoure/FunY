const http = require("http");
const express = require("express");
const socket = require("socket.io");

//const port = 1523;
const port = 15000;

var app = express();
var server = http.Server(app);

app.use(express.static("public"));

server.listen(port,function(){
    console.log("A szerver fut -> 127.0.0.1:"+port);
});

var io = socket(server,{
    cors: {
        origin: "*"
    }
});

var sockets = [];
var utolsoUzenet = "";

function ShowClients(){
    setTimeout(()=>{
        var n = sockets.length;
        io.emit("clients",n);
        console.log(`Kliensek: ${n}`);
    },100);
}

io.on("connect",socket=>{
    console.log("Bejövő socket kapcsolat.");
    ShowClients()
    sockets.push(socket);
    socket.emit("broadcast",utolsoUzenet);
    socket.on("disconnect",()=>{
        console.log("Megszakadt egy socket kapcsolat.");
        sockets.splice(sockets.indexOf(socket),1);
        ShowClients()
    });
    socket.on("broadcast",(d)=>{
        console.log(`Broadcast küldése: ${d}`);
        sockets.forEach(s=>{
            s.emit("broadcast",d);
            utolsoUzenet = d;
        });
    });
});
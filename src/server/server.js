const http = require("http");
const express = require("express");
const socketio = require("socket.io");
//Dependncies
const app = express();
const server = http.createServer(app);
//const clientPath = `${__dirname}/../client`;
const io = socketio(server);
io.set("origins", "http://localhost:8080");
// app.use(express.static(clientPath));

io.on("connection", (socket) => {
    socket.on("message", (msg) => {
        if (msg !== null && msg.origin !== null) {
            io.compress(true).emit("message", msg);
            console.log(msg);
        }
    });
    console.log("connected");
});

server.on("error", (err) => {
    console.error("SERVER CRASHED", err);
});

const port = process.env.PORT || 3000;
server.listen(port);

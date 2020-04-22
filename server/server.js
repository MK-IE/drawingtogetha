const http = require("http");
const express = require("express");
const socketio = require("socket.io");
//Dependncies
const app = express();
const server = http.createServer(app);
const clientPath = `${__dirname}/../client`;
const io = socketio(server);

app.use(express.static(clientPath));

io.on("connection", (socket) => {
    socket.on("message", (msg) => {
        if (msg !== null) {
            io.compress(true).emit("message", msg);
        }
    });

    socket.on("mouseorigin", (msg) => {
        if (msg !== null) {
            io.compress(true).emit("mouseorigin", msg);
        }
    });
});

server.on("error", (err) => {
    console.error("SERVER CRASHED", err);
});

const ip = "0.0.0.0";
const port = 8080;
server.listen(port, ip, () => {
    console.log(`Listening on port ${port} ip ${ip}`);
});

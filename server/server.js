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

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

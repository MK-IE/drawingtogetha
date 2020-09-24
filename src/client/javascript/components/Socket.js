import io from "socket.io-client";

const socket = io("http://localhost:3000");

export const listenForResponse = (messageType, execution) => {
    socket.on(messageType, (message) => {
        execution(message);
    });
};

export const writeMessage = (messageType, payload) => {
    socket.compress(true).emit(messageType, payload);
};

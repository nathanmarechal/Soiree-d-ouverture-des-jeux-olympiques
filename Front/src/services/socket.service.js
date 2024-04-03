// fichier : src/services/socket.service.js
import io from "socket.io-client";
let socket;

export const connectSocket = () => {
    // Assurez-vous que l'URL correspond à votre serveur Socket.IO
    socket = io("http://localhost:3000", { path: "/socket.io" });

    socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
    });

    return socket;
};

export const sendMessageSocket = (message) => {
    if (socket) socket.emit("send_message", message);
};

export const onMessageReceived = (cb) => {
    if (!socket) return;

    socket.on("new_message", (msg) => {
        console.log("New message received:", msg);
        cb(msg);
    });
};

export const disconnectSocket = () => {
    if(socket) socket.disconnect();
};

window.onload = function() {
    const username = sessionStorage.getItem("username");

    if (username) {
        const socket = io("http://localhost:4400/", { transports: ['websocket'] });

        socket.on("connect", () => {
            socket.emit("join-lobby", username);
        });
        // socket.on("connect", () => {
        //     socket.emit("loby-message", username,message);
        // });
        // Additional socket event listeners can be added here
    }
};
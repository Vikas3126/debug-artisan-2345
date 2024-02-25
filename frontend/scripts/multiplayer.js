const userInterface = document.getElementById('multiplayer-interface');
    const username = sessionStorage.getItem("username");
    const socket = io("http://localhost:4400/", { transports: ['websocket'] });
        socket.on("connect", () => {
            socket.emit("join-lobby", username);
        });
        // socket.on("connect", () => {
        //     socket.emit("loby-message", username,message);
        // });
        // Additional socket event listeners can be added here
    




        socket.on("connections_count", (count) => {
            // Clear existing tracks
            userInterface.innerHTML = '';
        
            // Create tracks for each connection
            for (let i = 0; i < count && i < 4; i++) {
                let usersTrack = document.createElement('div');
                usersTrack.className = "user-track";
                let track = document.createElement('h2');
                track.textContent = "- - - - - - - - - - - - - - - - - - - - - - - - - -";
                track.className = "track";
                usersTrack.append(track);
                userInterface.append(usersTrack);
            }
        });


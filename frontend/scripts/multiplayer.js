const userInterface = document.getElementById('multiplayer-interface');
    const username = sessionStorage.getItem("username");
    const socket = io("https://type-racing-speedster.onrender.com/", { transports: ['websocket'] });
        socket.on("connect", () => {
            socket.emit("join-lobby", username);
        });
        // socket.on("connect", () => {
        //     socket.emit("loby-message", username,message);
        // });
        // Additional socket event listeners can be added here
    
        let carImages = []; // Array to store the car images

        // Fetch car images from the server
        fetch('https://type-racing-speedster.onrender.com/cars/car-images')
          .then(response => response.json())
          .then(data => {
            carImages = data; 
            console.log(carImages);
          })
          .catch(error => console.error('Error fetching car images:', error));
        



        socket.on("connections_count", (count) => {
            // Clear existing tracks
            userInterface.innerHTML = '';
        
            // Create tracks for each connection
            for (let i = 0; i < count && i < 4; i++) {
                let usersTrack = document.createElement('div');
                const randomIndex = Math.floor(Math.random() * carImages.length);
                const carImageSrc = carImages[randomIndex];
        
                // Create an image element for the car
                let carImage = document.createElement('img');
                carImage.src = carImageSrc;
                carImage.alt = 'Car';
                usersTrack.appendChild(carImage);

                usersTrack.className = "user-track";
                let track = document.createElement('h2');
                track.textContent = "- - - - - - - - - - - - - - - - - - - - - - - - - -";
                track.className = "track";
                usersTrack.append(track);
                userInterface.append(usersTrack);
            }
        });


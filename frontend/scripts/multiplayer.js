const userInterface = document.getElementById('multiplayer-interface');
    const username = sessionStorage.getItem("username");
    const socket = io("http://localhost:4400/", { transports: ['websocket'] });
        socket.on("connect", () => {
            socket.emit("join-lobby", username);
        });
       
    
        let carImages = []; // Array to store the car images

        // Fetch car images from the server
        fetch('http://localhost:4400/cars/')
          .then(response => response.json())
          .then(data => {
            carImages = data.car_data; 
            console.log(carImages);
          })
          .catch(error => console.error('Error fetching car images:', error));
        



        socket.on("connections_count", ({count, usernames}) => {
            // Clear existing tracks
            userInterface.innerHTML = '';
        
            // Create tracks for each connection
            for (let i = 0; i < count && i < 4; i++) {
                let usersTrack = document.createElement('div');
                const randomIndex = Math.floor(Math.random() * carImages.length);
                console.log(randomIndex)
                const carImageSrc = carImages[randomIndex];
                console.log(carImageSrc)
                // Create an image element for the car
                let caruser = document.createElement("p")
                caruser.innerText = usernames[i]
                usersTrack.appendChild(caruser)

                let carImage = document.createElement('img');
                carImage.setAttribute("id", "carImage");
                carImage.src = carImageSrc.image;
                carImage.alt = 'Car';
                usersTrack.appendChild(carImage);

                usersTrack.className = "user-track";
                let track = document.createElement('h2');
                track.textContent = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -";
                track.className = "track";
                usersTrack.append(track);
                userInterface.append(usersTrack);
            }
        });


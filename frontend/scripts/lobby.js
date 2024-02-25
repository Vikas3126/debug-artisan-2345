const socket = io("https://type-racing-speedster.onrender.com/", { transports: ['websocket'] });


function joinLobby() {
    const usernameInput = document.getElementById('user-detail');
    const username = usernameInput.value.trim(); // Trim whitespace from the username

    if (username === "") {
        alert("Please enter a username.");
        return;
    }

    // Store connection state in sessionStorage
    sessionStorage.setItem("username", username);

    // Redirect the user to the lobby page
    window.location.href = "lobby.html";
}
function sendmessage(){
    const username = sessionStorage.getItem("username")
    let message=document.getElementById('messagebox');
   
    // if (message.value.trim() === "") {
    //     alert("Please enter a message.");
    //     return;
    // }
    socket.emit("loby-message",username,message.value);
    message.value=""
}

window.onload = function() {
    const username = sessionStorage.getItem("username");

    if (username) {
        const socket = io("https://type-racing-speedster.onrender.com/", { transports: ['websocket'] });

        socket.on("connect", () => {
            socket.emit("join-lobby", username);
        });
        // socket.on("connect", () => {
        //     socket.emit("loby-message", username,message);
        // });
        // Additional socket event listeners can be added here
    }
};

socket.on('lobby_info', (lobbyUsers) => {
    updateLobby(lobbyUsers);
});

function updateLobby(lobbyUsers) {
    const userLobby = document.getElementById('user-joining');
    // userLobby.innerHTML = '';
    lobbyUsers.forEach(user => {
        const newUser = document.createElement('div');
        console.log(`hello ${user.name}`);
        newUser.style.color = "#d62f3a"
        newUser.textContent = `${user.name} joined`;
        newUser.classList.add('joined-user');
        userLobby.appendChild(newUser);
    });

}


function timer() {
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.style.display = "flex";
    popup.style.flexDirection = "column";

    const timerElement = document.createElement('h2');
    const gif = document.createElement('img');
    gif.src = "https://cdn.pixabay.com/animation/2023/03/27/19/09/19-09-52-704_512.gif";
    popup.append(timerElement, gif);


    let count = 5;
    updateTimer();

    function updateTimer() {
        if (count > 0) {
            timerElement.innerText = count;
            count--;
            setTimeout(updateTimer, 1000); 
        } else {
            timerElement.innerText = "GO";
            setTimeout(() => {
                window.location.href = "multiplayer.html";
            }, 1000); 
        }
    }
}
socket.on('lobby_msg', (username,message) => {
    updatemessage(username,message);
});

function updatemessage(username,messagedetails) {
    const userLobby = document.getElementById('user-joining');
   
        const newUser = document.createElement('div');
        newUser.textContent = `${username}: ${messagedetails}`;
        newUser.classList.add('message-detail');
        userLobby.appendChild(newUser);

    


}


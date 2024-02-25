const socket = io("http://localhost:4400/", { transports: ['websocket'] });


function joinLobby(){
    const username = document.getElementById('userName').value;
    socket.emit("join-lobby",username);
}
function sendmessage(){
    const username = document.getElementById('userName').value;
    const message=document.getElementById('messagebox').value;
    socket.emit("loby-message",username,message);
}


socket.on('lobby_info', (lobbyUsers) => {
    updateLobby(lobbyUsers);
});

function updateLobby(lobbyUsers) {
    const userLobby = document.getElementById('user-joining');
    // userLobby.innerHTML = '';
    lobbyUsers.forEach(user => {
        const newUser = document.createElement('div');
        newUser.textContent = `${user.name} joined`;
        newUser.classList.add('joined-user');
        userLobby.appendChild(newUser);
    });

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


const socket = io("http://localhost:4400/", { transports: ['websocket'] });


function joinLobby(){
    const username = document.getElementById('userName').value;
    socket.emit("join-lobby",username);
}


socket.on('lobby_info', (lobbyUsers) => {
    updateLobby(lobbyUsers);
});

function updateLobby(lobbyUsers) {
    const userLobby = document.getElementById('user-joining');
    userLobby.innerHTML = '';
    lobbyUsers.forEach(user => {
        const newUser = document.createElement('div');
        newUser.textContent = `${user.name} joined`;
        newUser.classList.add('joined-user');
        userLobby.appendChild(newUser);
    });

    

}
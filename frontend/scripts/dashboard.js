document.getElementById("joinRaceBtn").addEventListener("click", function () {
    loadRaceSection("Join a Race Content");
});

document.getElementById("createRaceBtn").addEventListener("click", function () {
    loadRaceSection("Create a Race Content");
});

document.getElementById("practiceBtn").addEventListener("click", function () {
    loadRaceSection("Practice Content");
});

function loadRaceSection(content) {
    document.getElementById("raceSection").innerHTML = content;
    // Additional logic for handling race content
}

// You can implement similar functions for the leaderboard section

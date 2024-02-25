// document.getElementById("joinRaceBtn").addEventListener("click", function () {
//     loadRaceSection("Join a Race Content");
// });

// document.getElementById("createRaceBtn").addEventListener("click", function () {
//     loadRaceSection("Create a Race Content");
// });

// document.getElementById("team").addEventListener("click", function (e) {
//     e.preventDefault()
//     window.location.href = "news.html"
// });

// function loadRaceSection(content) {
//     document.getElementById("raceSection").innerHTML = content;
//     // Additional logic for handling race content
// }

// You can implement similar functions for the leaderboard section
document.getElementById("Learnig").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "../learningTool.html"
});


function openPopup() {
    // Show the popup
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    // Hide the popup
    document.getElementById('popup').style.display = 'none';
}

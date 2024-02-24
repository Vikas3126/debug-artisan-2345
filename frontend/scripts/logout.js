
function logout() {
    const accessToken = localStorage.getItem("token");

    fetch(`http://localhost:4400/users/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
        .then((response) => {
            if (response.ok) {
                localStorage.removeItem("token")
                return response.json();
            } else {
                throw new Error(`Logout failed: ${response.statusText}`);
            }
        })
        .then((result) => {
            console.log(result.msg);
            location.href = '../index.html';
        })
        .catch((error) => {
            console.error(error);
        });
}

document.getElementById("Learnig").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "learningTool.html"
});

document.getElementById("team").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "news.html"
});

document.getElementById("Home").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "dashboard.html"
});
function toggleMenu() {
    var innerNavbar = document.querySelector('.inner-navbar');
    innerNavbar.classList.toggle('show');
  }
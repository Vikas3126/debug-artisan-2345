// script file for landing page
document.getElementById("Learnig").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "./frontend/view/learningTool.html"
});

document.getElementById("team").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "./frontend/view/news.html"
});

document.getElementById("view-btn").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "./frontend/view/news.html"
});

document.getElementById("reg-btn").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "./frontend/view/loginPage.html#"
});
document.getElementById("log-btn").addEventListener("click", function (e) {
    e.preventDefault()
    window.location.href = "./frontend/view/loginPage.html"
});
function toggleMenu() {
    var innerNavbar = document.querySelector('.inner-navbar');
    innerNavbar.classList.toggle('show');
  }
const userInterface = document.getElementById('multiplayer-interface');
const username = sessionStorage.getItem("username");
// const inputPanel = document.getElementById('typing-input');
// const panelInfo = document.getElementById('panel-info');
const socket = io("https://type-racing-speedster.onrender.com/", { transports: ['websocket'] });



const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

let carImages = []; 

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  paragraphs[ranIndex].split("").forEach(char => {
      let span = `<span>${char}</span>`
      typingText.innerHTML += span;
  });
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}


function initTyping(typedText) {
  
  let cars = document.getElementById("carImage0");
  let pos = 0;
  let start = window.getComputedStyle(cars).left;
  console.log(start)
  let characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
  if(charIndex < characters.length - 1 && timeLeft > 0) {
      if(!isTyping) {
          timer = setInterval(initTimer, 1000);
          isTyping = true;
      }
      if(typedChar == null) {
          if(charIndex > 0) {
              charIndex--;
              if(characters[charIndex].classList.contains("incorrect")) {
                  mistakes--;
              }
              characters[charIndex].classList.remove("correct", "incorrect");
          }
      } else {
          if(characters[charIndex].innerText == typedChar) {
              characters[charIndex].classList.add("correct");
              cars.classList.add("correct");
              
              start = `${Number(start.split("px")[0])+1}px`
              console.log(start)

              cars.style.left = start;

          } else {
              mistakes++;
              characters[charIndex].classList.add("incorrect");
          }
          charIndex++;
      }
      characters.forEach(span => span.classList.remove("active"));
      characters[charIndex].classList.add("active");

      let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
      
      wpmTag.innerText = wpm;
      mistakeTag.innerText = mistakes;
      cpmTag.innerText = charIndex - mistakes;
  } else {
      clearInterval(timer);
      inpField.value = "";
  }   
}

function initTimer() {
  if(timeLeft > 0) {
      timeLeft--;
      timeTag.innerText = timeLeft;
      let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
      wpmTag.innerText = wpm;
  } else {
      clearInterval(timer);
  }
}

function resetGame() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

// Fetch car images from the server
fetch('https://type-racing-speedster.onrender.com/cars/')
    .then(response => response.json())
    .then(data => {
        carImages = data.car_data; 
        console.log(carImages);
    })
    .catch(error => console.error('Error fetching car images:', error));

socket.on("connect", () => {
    socket.emit("join-lobby", username);
});

socket.on("connections_count", ({ count, usernames }) => {
    // Clear existing tracks
    userInterface.innerHTML = '';

    // Create tracks for each connection
    for (let i = 0; i < count && i < 4; i++) {
        let usersTrack = document.createElement('div');
        const randomIndex = Math.floor(Math.random() * carImages.length);
        const carImageSrc = carImages[randomIndex];

        // Create an image element for the car
        let caruser = document.createElement("p")
        caruser.innerText = usernames[i]
        usersTrack.appendChild(caruser)

        let carImage = document.createElement('img');
        carImage.setAttribute("id", `carImage${i}`);
        carImage.className = "carImage"
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


inpField.addEventListener('input',(event)=>{
  const typedText = event.target.value;
initTyping()
// console.log(typedText);
  socket.emit('typing',typedText);
})



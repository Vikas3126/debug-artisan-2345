
  function appendCards() {
    const cardContainer = document.getElementById("card-container");

    fetch("https://type-racing-speedster.onrender.com/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const cardItem = document.createElement("div");
          cardItem.classList.add("card-item");

          const img = document.createElement("img");
          img.src = item.image;
          img.alt = item.description;

          const p = document.createElement("p");
          p.textContent = item.description;

          cardItem.appendChild(img);
          cardItem.appendChild(p);
          cardContainer.appendChild(cardItem);
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  appendCards();

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      appendCards();
    }
  });

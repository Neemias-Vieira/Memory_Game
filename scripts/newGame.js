const inputName = document.querySelector(".inputName");
const newGameButton = document.querySelector(".newGameButton");
const newGameForm = document.querySelector(".newGameForm");

function validateInput(event) {
  if (event.target.value.length >= 3) {
    newGameButton.removeAttribute("disabled");
  } else {
    newGameButton.setAttribute("disabled", "true");
  }
}

function handleSubmitNewGame(event) {
  event.preventDefault();
  localStorage.setItem("@memoryGame:playerName", inputName.value);
  inputName.value = "";

  const playerResp = confirm(
    "Ao clicar em 'OK' o tempo ja estará contando, então seja ágil."
  );

  if (playerResp) {
    window.location.href = "pages/cards.html";
  }
}

inputName.addEventListener("input", validateInput);
newGameForm.addEventListener("submit", handleSubmitNewGame);

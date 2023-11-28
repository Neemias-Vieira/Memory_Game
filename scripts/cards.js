document.addEventListener("contextmenu", (event) => event.preventDefault());

function backPage() {
  const playerResp = confirm(
    "Deseja sair do jogo? Todo progresso atual será perdido."
  );

  if (playerResp) {
    window.history.back();
  }
}

function createCards() {
  const cardNames = [
    "card_1",
    "card_2",
    "card_3",
    "card_4",
    "card_5",
    "card_6",
    "card_7",
    "card_8",
    "card_9",
    "card_10",
    "card_11",
    "card_12",
    "card_13",
    "card_14",
    "card_15",
    "card_16",
    "card_17",
    "card_18",
    "card_19",
  ];

  const arrayCardsNames = cardNames
    .sort(() => Math.random() - 0.5)
    .filter((value, index) => index < 12);

  const sortedCards = [...arrayCardsNames, ...arrayCardsNames]
    .sort(() => Math.random() - 0.5)
    .filter((value, index) => index < 24);

  gridCards.innerHTML = "";
  sortedCards.forEach((card) => {
    gridCards.innerHTML += `
    <div class="card" name="${card}">
        <div class="front">
            <img src="../images/${card}.jpg" />
        </div><!--front-->

        <div class="back">
            <img src="../images/yugioh-card-back.png" />
        </div><!--back-->
    </div>`;
  });
}

function cleanNameCards() {
  firstCard = "";
  secondCard = "";
}

function checkMacthCards() {
  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    new Audio("../audios/sci-fi.wav").play();
    setTimeout(() => {
      firstCard.classList.add("disabeCard");
      secondCard.classList.add("disabeCard");
      cleanNameCards();
    }, 500);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipCard");
      secondCard.classList.remove("flipCard");
      cleanNameCards();
    }, 500);
  }
}

function clickFlipCard() {
  const arrayCards = document.querySelectorAll(".card");
  arrayCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (card.classList.contains("flipCard")) return;

      new Audio("../audios/flip.wav").play();
      if (firstCard == "") {
        firstCard = card;
        card.classList.add("flipCard");
      } else if (secondCard == "") {
        secondCard = card;
        card.classList.add("flipCard");

        checkMacthCards();
      }
    });
  });
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");

const storagePlayerName = localStorage.getItem("@memoryGame:playerName");
localStorage.getItem("@memoryGame:playerName");

playerName.innerHTML = storagePlayerName;
backButton.addEventListener("click", backPage);

createCards();

let firstCard = "";
let secondCard = "";
clickFlipCard();

document.addEventListener("contextmenu", (event) => event.preventDefault());

function backPage() {
  if (playerWinGame) {
    window.history.back();
  } else {
    const playerResp = confirm(
      "Deseja sair do jogo? Você perderá seu progresso!"
    );
    if (playerResp) {
      window.history.back();
    }
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

function checkGameWin() {
  const disabledCards = document.querySelectorAll(".disabledCard");
  if (disabledCards.length === 2) {
    clearInterval(finishTimerInterval);

    playerWinGame = true;

    const userData = {
      name: playerName.textContent,
      time: timer.textContent,
    };

    const storageRank = JSON.parse(localStorage.getItem("@memoryGame:rank"));

    if (storageRank) {
      const rankData = [...storageRank, userData];
      localStorage.setItem("@memoryGame:rank", JSON.stringify(rankData));
    } else {
      localStorage.setItem("@memoryGame:rank", JSON.stringify([userData]));
    }

    alert(
      `Parabéns ${storagePlayerName}, você venceu com tempo de ${timer.innerHTML}!`
    );

    backPage();
  }
}

function checkMacthCards() {
  if (firstCard.getAttribute("name") === secondCard.getAttribute("name")) {
    new Audio("../audios/sci-fi.wav").play();
    setTimeout(() => {
      firstCard.classList.add("disabledCard");
      secondCard.classList.add("disabledCard");
      cleanNameCards();
      checkGameWin();
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

function setStartTime() {
  finishTimerInterval = setInterval(() => {
    const dateNow = new Date();

    const dateDiff = new Date(dateNow - initialDateTimer);

    const minutes = String(dateDiff.getMinutes()).padStart(2, "0");

    const seconds = String(dateDiff.getSeconds()).padStart(2, "0");

    timer.innerHTML = `${minutes}:${seconds}`;
  }, 1000);
}

const playerName = document.querySelector(".playerName");
const backButton = document.querySelector(".backButton");
const gridCards = document.querySelector(".gridCards");
const timer = document.querySelector(".timer");

const storagePlayerName = localStorage.getItem("@memoryGame:playerName");
localStorage.getItem("@memoryGame:playerName");

playerName.innerHTML = storagePlayerName;
backButton.addEventListener("click", backPage);

createCards();

let firstCard = "";
let secondCard = "";
clickFlipCard();

const initialDateTimer = new Date();
let finishTimerInterval;
setStartTime();

let playerWinGame = false;

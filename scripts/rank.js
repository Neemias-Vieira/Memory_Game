function backPage() {
  window.history.back();
}

function crateBodyTableRank() {
  const storageRank = JSON.parse(localStorage.getItem("@memoryGame:rank"));
  let rankSorted;

  if (storageRank) {
    rankSorted = storageRank
      .sort((a, b) => {
        if (a.time > b.time) return 1;
        if (a.time < b.time) return -1;
        return 0;
      })
      .filter((value, index) => index < 10);
  }
  bodyTableRank.innerHTML = "";
}

const backButton = document.querySelector(".backButton");
const bodyTableRank = document.querySelector(".tableRank tbody");

backButton.addEventListener("click", backPage);

crateBodyTableRank();

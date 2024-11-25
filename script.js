let playerTurn = "one";

let playerOneCase = [];
let playerTwoCase = [];
let playerOneScore = 0;
let playerTwoScore = 0;

const scoreOne = document.getElementById("scoreOne");
const scoreTwo = document.getElementById("scoreTwo");

let cells = document.querySelectorAll("td");

let moveCount = 0;

const winningCombinations = [
  ["a1", "a2", "a3"], // Ligne
  ["b1", "b2", "b3"], // Ligne
  ["c1", "c2", "c3"], // Ligne
  ["a1", "b1", "c1"], // Colonne
  ["a2", "b2", "c2"], // Colonne
  ["a3", "b3", "c3"], // Colonne
  ["a1", "b2", "c3"], // Diagonale
  ["a3", "b2", "c1"], // Diagonale
];

function checkDraw() {
  if (moveCount === 9 && !checkWin(playerOneCase) && !checkWin(playerTwoCase)) {
    setTimeout(() => {
      alert("Match Nul");
      resetGame();
    }, 200);
  }
}
/* voiture*/

function resetGame() {
  cells.forEach(cell => {
    cell.innerText = "";
  });
  playerOneCase = [];
  playerTwoCase = [];
  moveCount = 0;
}

function checkWin(playerCases) {
  for (let combination of winningCombinations) {
    if (combination.every(cell => playerCases.includes(cell))) {
      return true; //
    }
  }
  return false;
}

function addPlayerCase(id) {
  if (playerTurn === "one") {
    playerOneCase.push(id);
    document.getElementById(id).innerText = "X";

    if (checkWin(playerOneCase)) {
      setTimeout(() => {
        alert("Player 1 a gagné !");
        playerOneScore++;
        scoreOne.innerHTML = `Joueur 1 : ${playerOneScore}`;
        resetGame();
      }, 200);
      return;
    }

    playerTurn = "two";
  } else {
    playerTwoCase.push(id);
    document.getElementById(id).innerText = "O";

    if (checkWin(playerTwoCase)) {
      setTimeout(() => {
        alert("Player 2 a gagné !");
        playerTwoScore++;
        scoreTwo.innerHTML = `Joueur 2 : ${playerTwoScore}`;
        resetGame();
      }, 200);
      return;
    }

    playerTurn = "one";
  }
  moveCount++;
  checkDraw();
}

cells.forEach(cell => {
  cell.addEventListener("click", function () {
    if (cell.innerText === "") {
      addPlayerCase(cell.id);
    }
  });
});

let playerTurn = 'one';

const players = {
  one: {
    name: '1',
    cases: [],
    score: 0,
    scoreContainer: document.getElementById('scoreOne'),
    mark: 'X',
  },
  two: {
    name: '2',
    cases: [],
    score: 0,
    scoreContainer: document.getElementById('scoreTwo'),
    mark: 'O',
  },
};

const cells = document.querySelectorAll('td');

let moveCount = 0;

const winningCombinations = [
  ['a1', 'a2', 'a3'], // Ligne
  ['b1', 'b2', 'b3'], // Ligne
  ['c1', 'c2', 'c3'], // Ligne
  ['a1', 'b1', 'c1'], // Colonne
  ['a2', 'b2', 'c2'], // Colonne
  ['a3', 'b3', 'c3'], // Colonne
  ['a1', 'b2', 'c3'], // Diagonale
  ['a3', 'b2', 'c1'], // Diagonale
];

function checkDraw() {
  return moveCount === 9;
}

function resetGame() {
  cells.forEach((cell) => {
    cell.innerText = '';
  });

  players.one.cases = [];
  players.two.cases = [];
  moveCount = 0;
}

function getCurrentPlayer() {
  return players[playerTurn];
}

function checkWin() {
  return winningCombinations.some((combination) =>
    combination.every((cell) => getCurrentPlayer().cases.includes(cell)),
  );
}

function onWin() {
  const winingPlayer = getCurrentPlayer();

  alert(`Player ${winingPlayer.name} a gagné !`);

  winingPlayer.score++;
  winingPlayer.scoreContainer.querySelector('.score').innerText =
    winingPlayer.score;

  resetGame();
}

function onDraw() {
  alert('Match Nul');
  resetGame();
}

function addPlayerCell(target) {
  const player = getCurrentPlayer();

  player.cases.push(target.id);
  target.innerText = player.mark;
}

function switchPlayer() {
  playerTurn = playerTurn === 'one' ? 'two' : 'one';
}

function onCellClick({ target }) {
  addPlayerCell(target);

  if (checkWin()) onWin();
  if (checkDraw()) onDraw();

  switchPlayer();

  moveCount++;
}

function init() {
  cells.forEach((cell) => {
    cell.addEventListener('click', function (event) {
      console.log('event click => ', event);

      if (cell.innerText === '') {
        onCellClick(event);
      }
    });
  });
}

init();

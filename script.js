// Game State Variables
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], 
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]            
];

const cells = document.querySelectorAll(".cell");
const winnerText = document.getElementById("winner");

cells.forEach(cell => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

function handleCellClick(cell) {
  const index = cell.getAttribute("data-index");

  if (gameBoard[index] || winnerText.textContent) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    displayWinner(`${currentPlayer} Wins!`);
  } else if (isDraw()) {
    displayWinner("It's a Draw!");
  } else {
    togglePlayer();
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

function isDraw() {
  return gameBoard.every(cell => cell !== null);
}

function displayWinner(message) {
  winnerText.textContent = message;
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
  gameBoard.fill(null);
  cells.forEach(cell => (cell.textContent = ""));
  winnerText.textContent = "";
  currentPlayer = "X";
}

document.querySelector(".reset-btn").addEventListener("click", resetGame);




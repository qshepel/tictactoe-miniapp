
const boardElement = document.getElementById("board");
const infoElement = document.getElementById("info");
const ratingElement = document.getElementById("rating");

let board = Array(9).fill(null);
let player = Math.random() < 0.5 ? "X" : "O";
let current = player;
let rating = 0;
let gameOver = false;

function render() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell || "";
    if (!cell && !gameOver) {
      div.onclick = () => handleMove(index);
    }
    boardElement.appendChild(div);
  });
}

function handleMove(index) {
  if (board[index] || gameOver) return;
  board[index] = current;
  render();
  if (checkWin(current)) {
    infoElement.textContent = current === player ? "Вы победили!" : "Вы проиграли!";
    rating += current === player ? 25 : -25;
    ratingElement.textContent = "Рейтинг: " + rating;
    gameOver = true;
  } else if (board.every(Boolean)) {
    infoElement.textContent = "Ничья!";
    gameOver = true;
  } else {
    current = current === "X" ? "O" : "X";
    if (current !== player) {
      setTimeout(botMove, 500);
    }
  }
}

function botMove() {
  let available = board.map((v, i) => v ? null : i).filter(v => v !== null);
  if (available.length > 0) {
    let move = available[Math.floor(Math.random() * available.length)];
    handleMove(move);
  }
}

render();
if (current !== player) {
  botMove();
}

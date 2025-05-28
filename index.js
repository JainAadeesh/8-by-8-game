const board = [];
let currentPlayer = 'X';
const statusText = document.getElementById('status');
let gameOver = false;
let resetGame = document.querySelector("#resetgame")
const gameBoard = document.getElementById('game-board');
let play = document.querySelector(".con")
let win = document.querySelector(".cont")


for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.row = i;
        box.dataset.column = j;
        box.addEventListener('click', () => handleClick(j));
        board[i][j] = '';
        gameBoard.appendChild(box);
    }
    play.classList.remove("hide");
    win.classList.add("hide");
    // play.classList.add("hide");
    // cont.classList.remove("hide");
}

function handleClick(col) {
    if (gameOver) return;

    for (let row = 7; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            updateBoard();
            if (checkWinner(row, col)) {
                declareWinner();
            } else {
                togglePlayer();
            }
            return;
        }
    }
    alert("Column is full. Choose another one.");
    play.classList.remove("hide");
    win.classList.add("hide");
}

function updateBoard() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        const row = box.dataset.row;
        const col = box.dataset.column;
        box.textContent = board[row][col];
    });
}


function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn (${currentPlayer})`;
}

function declareWinner() {
    statusText.textContent = `Player ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'} wins!`;
    gameOver = true;
    play.classList.add("hide");
    win.classList.remove("hide");
}

function checkWinner(row, col) {
    return checkDirection(row, col, 0, 1) ||
        checkDirection(row, col, 1, 0) ||
        checkDirection(row, col, 1, 1) ||
        checkDirection(row, col, 1, -1);
}

function checkDirection(row, col, dx, dy) {
    let count = 1;

    for (let i = 1; i < 4; i++) {
        const r = row + i * dx;
        const c = col + i * dy;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    for (let i = 1; i < 4; i++) {
        const r = row - i * dx;
        const c = col - i * dy;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

function restartGame() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board[i][j] = '';
        }
    }
    currentPlayer = 'X';
    gameOver = false;
    statusText.textContent = `Player 1's turn (X)`;
    updateBoard();
    play.classList.remove("hide");
    win.classList.add("hide");
}


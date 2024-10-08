const board = [];
let currentPlayer = 'X'; // Player 1 starts as 'X'
const statusText = document.getElementById('status');
let gameOver = false; // Flag to stop the game when there is a winner
let resetGame = document.querySelector("#resetgame")

// Initialize the 8x8 game board
const gameBoard = document.getElementById('game-board');
for (let i = 0; i < 8; i++) {
    board[i] = [];
    for (let j = 0; j < 8; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.dataset.row = i;
        box.dataset.column = j;
        box.addEventListener('click', () => handleClick(j)); // Click handler passes the column index
        board[i][j] = '';
        gameBoard.appendChild(box);
    }
}

// Handle click event when a column is clicked
function handleClick(col) {
    if (gameOver) return; // Stop further moves if the game is over

    // Find the bottom-most empty row in the clicked column
    for (let row = 7; row >= 0; row--) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer; // Place the current player's mark
            updateBoard();
            if (checkWinner(row, col)) {
                declareWinner();
            } else {
                togglePlayer();
            }
            return;
        }
    }
    // If no available space in column
    alert("Column is full. Choose another one.");
}

// Update the game board display
function updateBoard() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        const row = box.dataset.row;
        const col = box.dataset.column;
        box.textContent = board[row][col];
    });
}

// Switch the player after a valid move
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s turn (${currentPlayer})`;
}

// Declare the winner
function declareWinner() {
    statusText.textContent = `Player ${currentPlayer === 'X' ? '1 (X)' : '2 (O)'} wins!`;
    gameOver = true; // Set gameOver to true to stop further moves
}

// Check if there's a winner (4 in a row)
function checkWinner(row, col) {
    return checkDirection(row, col, 0, 1) || // Horizontal
           checkDirection(row, col, 1, 0) || // Vertical
           checkDirection(row, col, 1, 1) || // Diagonal (top-left to bottom-right)
           checkDirection(row, col, 1, -1);  // Anti-diagonal (top-right to bottom-left)
}

// Helper function to check for 4 in a row in a given direction (dx, dy)
function checkDirection(row, col, dx, dy) {
    let count = 1;

    // Check forward direction
    for (let i = 1; i < 4; i++) {
        const r = row + i * dx;
        const c = col + i * dy;
        if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === currentPlayer) {
            count++;
        } else {
            break;
        }
    }

    // Check backward direction
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

// // Restart the game
// function restartGame() {
//     // Reset the board
//     for (let i = 0; i < 8; i++) {
//         for (let j = 0; j < 8; j++) {
//             board[i][j] = '';
//         }
//     }
//     currentPlayer = 'X';
//     gameOver = false;
//     statusText.textContent = `Player 1's turn (X)`;
//     updateBoard();
// }


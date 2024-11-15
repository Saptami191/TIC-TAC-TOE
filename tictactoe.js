const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    return board.every(cell => cell !== null);
}

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    } else if (checkTie()) {
        setTimeout(() => alert("It's a tie!"), 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

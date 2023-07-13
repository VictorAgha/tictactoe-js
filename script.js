const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let player1Score = 0;
let player2Score = 0;
const cells = Array.from(document.getElementsByClassName('cell'));

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('reset').addEventListener('click', resetGame);

function startGame() {
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;
    currentPlayer = 'X';
    board.fill('');
    cells.forEach(cell => {
        cell.value = '';
        cell.classList.remove('winner');
    });
    document.getElementById('result').textContent = '';
}

function makeMove(index) {
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].value = currentPlayer;
        if (checkWin(currentPlayer)) {
            document.getElementById('result').textContent = currentPlayer + ' wins!';
            cells[index].classList.add('winner');
            updateScore();
            return;
        }
        if (checkDraw()) {
            document.getElementById('result').textContent = 'Its a draw!';
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateScore() {
    if (currentPlayer === 'X') {
        player1Score++;
        document.getElementById('player1score').textContent = player1 + ' Score: ' + player1Score;
    } else {
        player2Score++;
        document.getElementById('player2score').textContent = player2 + ' Score: ' + player2Score;
    }
}



function resetGame() {
    startGame();
    document.getElementById('player1score').textContent = player1 + ' Score: ' + player1Score;
    document.getElementById('player2score').textContent = player2 + ' Score: ' + player2Score;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});
document.addEventListener('DOMContentLoaded', () => {
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startGameButton = document.getElementById('startGame');
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell:not(.preview)');
    const previewCells = document.querySelectorAll('.cell.preview');
    const gameStatus = document.getElementById('gameStatus');
    const gameResult = document.getElementById('gameResult');
    const resultMessage = document.getElementById('resultMessage');
    const playAgainButton = document.getElementById('playAgain');
    const viewBoardButton = document.getElementById('viewBoard');
    const backToResultButton = document.getElementById('backToResult');
    const boardPreview = document.getElementById('boardPreview');

    let currentPlayer = 'X';
    let gameActive = false;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let player1Name = '';
    let player2Name = '';

    startGameButton.addEventListener('click', () => {
        player1Name = player1Input.value.trim();
        player2Name = player2Input.value.trim();

        if (player1Name && player2Name) {
            document.querySelector('.player-names').style.display = 'none';
            gameBoard.classList.remove('hidden');
            gameActive = true;
        } else {
            alert('Пожалуйста, введите имена обоих игроков');
        }
    });

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    playAgainButton.addEventListener('click', resetGame);
    viewBoardButton.addEventListener('click', showBoardPreview);
    backToResultButton.addEventListener('click', hideBoardPreview);

    function handleCellClick(cell) {
        const cellIndex = cell.getAttribute('data-index');

        if (!gameActive || gameState[cellIndex] !== '') return;

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            const winnerName = currentPlayer === 'X' ? player1Name : player2Name;
            showGameResult(`${winnerName} победил!`);
        } else if (gameState.every(cell => cell !== '')) {
            showGameResult('Ничья!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
            [0, 4, 8], [2, 4, 6] // Диагонали
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameState[a] && 
                   gameState[a] === gameState[b] && 
                   gameState[a] === gameState[c];
        });
    }

    function showGameResult(message) {
        gameActive = false;
        resultMessage.textContent = message;
        gameBoard.classList.add('hidden');
        gameResult.classList.remove('hidden');

        // Hide the main title when showing game result
        document.querySelector('h1').style.display = 'none';

        // Update preview cells
        previewCells.forEach((cell, index) => {
            cell.textContent = gameState[index];
        });
    }

    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        cells.forEach(cell => {
            cell.textContent = '';
        });

        gameResult.classList.add('hidden');
        gameBoard.classList.remove('hidden');

        // Restore the main title when starting a new game
        document.querySelector('h1').style.display = 'block';
    }

    function showBoardPreview() {
        boardPreview.classList.remove('hidden');
        resultMessage.style.display = 'none';
        document.querySelector('.result-actions').style.display = 'none';
    }

    function hideBoardPreview() {
        boardPreview.classList.add('hidden');
        resultMessage.style.display = 'block';
        document.querySelector('.result-actions').style.display = 'flex';
    }
});
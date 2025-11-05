import { createBoard, resetGame } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const select = document.getElementById('card-select');
    const winModal = document.getElementById('win-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function startNewGame() {
        winModal.style.display = 'none';
        const cardCount = parseInt(select.value, 10);
        const theme = document.getElementById('theme-select').value;
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        resetGame();
        createBoard(cardCount, theme);
    }

    closeModalBtn.addEventListener('click', () => {
    winModal.style.display = 'none';
    })

    startNewGame();
    select.addEventListener('change', startNewGame);
    restartBtn.addEventListener('click', startNewGame);
});
import { createBoard, resetGame } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const cardRadios = document.querySelectorAll('input[name="cards"]');
    const themeRadios = document.querySelectorAll('input[name="theme"]');
    const winModal = document.getElementById('win-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function startNewGame() {
        winModal.style.display = 'none';
        const cardCount = parseInt(document.querySelector('input[name="cards"]:checked').value, 10);
        const theme = document.querySelector('input[name="theme"]:checked').value;
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
        resetGame();
        createBoard(cardCount, theme);
    }

    closeModalBtn.addEventListener('click', () => {
    winModal.style.display = 'none';
    })

    startNewGame();
    cardRadios.forEach(radio => radio.addEventListener('change', startNewGame));
    themeRadios.forEach(radio => radio.addEventListener('change', startNewGame));
    restartBtn.addEventListener('click', startNewGame);
});
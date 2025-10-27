import { createBoard, resetGame } from './board.js';

document.addEventListener('DOMContentLoaded', () => {
    const restartBtn = document.getElementById('restart-btn');
    const select = document.getElementById('card-select');

    function startNewGame() {
        const cardCount = parseInt(select.value, 10);
        resetGame();
        createBoard(cardCount);
    }

    startNewGame(); // Pelin käynnistys heti sivun latauduttua

    select.addEventListener('change', startNewGame); // Korttimäärän vaihtuessa aloitetaan uusi peli

    restartBtn.addEventListener('click', startNewGame); // Uusi peli -nappi käyttää valintaa, joka on aktiivinen
});
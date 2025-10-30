import { createCardElement, flipCard } from './card.js';

const flipSound = new Audio('./sounds/flipcard.mp3');
const pairSound = new Audio('./sounds/findpair.mp3');
flipSound.volume = 0.3;
pairSound.volemu = 0.5;

const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];
const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;
let totalPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount) {
    totalPairs = cardCount / 2;
    const selectedCards = allCards.slice(0, totalPairs);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener('click', () => {
            if (lockBoard) return;
            flipCard(cardElement, handleCardFlip);
        });
        gameBoard.appendChild(cardElement);
    });
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    cardElement.classList.add('flipped');
    cardElement.textContent = cardElement.dataset.card;

    flipSound.currentTime = 0;
    flipSound.play();

    if (!firstCard) {
        firstCard = cardElement;
        return;
    }

    secondCard = cardElement;
    lockBoard = true;
    attempts++;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;

    setTimeout(() => {
        pairSound.currentTime = 0;
        pairSound.play();
    }, 500);

    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            const modal =document.getElementById('win-modal');
            const message = document.getElementById('win-message');
            message.textContent = `Löysit kaikki parit ${attempts} yrityksellä!`;
            modal.style.display = 'flex';
        }, 1500);
    }
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        flipSound.currentTime = 0;
        flipSound.play();
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

export function resetGame(cardCount) {
    gameBoard.innerHTML = '';
    [firstCard, secondCard, lockBoard] = [null, null, false];
    attempts = 0;
    matchedPairs = 0;
}
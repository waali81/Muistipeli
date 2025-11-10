import { createCardElement, flipCard } from './card.js';

const flipSound = new Audio('./sounds/flipcard.mp3');
const pairSound = new Audio('./sounds/findpair.mp3');
flipSound.volume = 0.3;
pairSound.volemu = 0.5;

let timerInterval = null;
let startTime = null;
const timerDisplay = document.getElementById('timer');

/*const allCards = [
    '🍎', '🍐', '🍒', '🍉', '🍇', '🍓', '🍌', '🍍', '🥝', '🥥', '🍑', '🍈', '🍋', '🍊', '🍏', '🍅'
];*/

const fruitCards =[
    'apple.png', 'pear.png', 'carrot.png', 'watermelon.png', 'grape.png', 'strawberry.png', 'banana.png', 'pineapple.png',
    'kiwi.png', 'blueberry.png', 'peach.png', 'pepper.png', 'raspberry.png', 'orange.png', 'avocado.png', 'tomato.png'  
];

const animalCards = [
    'bear.png', 'butterfly.png', 'caribou.png', 'cat.png', 'falcon.png', 'fish.png', 'fox.png', 'frog.png', 'lion.png', 'mallard.png',
    'monkey.png', 'snake.png', 'squirrel.png', 'tiger.png', 'turtle.png', 'wolf.png'
]

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;
let totalPairs = 0;
let displayedSeconds = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function createBoard(cardCount, theme='fruits') {
    totalPairs = cardCount / 2;
    let selectedSet = theme === 'animals' ? animalCards : fruitCards;
    const selectedCards = selectedSet.slice(0, totalPairs);
    const cards = [...selectedCards, ...selectedCards];
    shuffle(cards);

    gameBoard.innerHTML = '';

    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardElement.dataset.theme = theme;
        cardElement.addEventListener('click', () => {
            if (lockBoard) return;
            flipCard(cardElement, handleCardFlip);
        });
        gameBoard.appendChild(cardElement);
    });
}
function startTimer() {
    clearInterval(timerInterval);
    startTime = Date.now();
    timerDisplay.textContent = 'Aika: 0:00 min';
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    displayedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(displayedSeconds / 60);
    const seconds = displayedSeconds % 60;
    timerDisplay.textContent = `Aika: ${minutes}:${seconds.toString().padStart(2, '0')} min`;
}

function stopTimer() {
    clearInterval(timerInterval);
    updateTimer();
}

function handleCardFlip(cardElement) {
    if (lockBoard) return;
    if (cardElement === firstCard) return;

    if (!startTime) {
        startTimer();
    }

    cardElement.classList.add('flipped');

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
        stopTimer();
        setTimeout(() => {
            const modal =document.getElementById('win-modal');
            const message = document.getElementById('win-message');
            const minutes = Math.floor(displayedSeconds / 60);
            const seconds = displayedSeconds % 60;
            const timeString = `${minutes}:${seconds.toString().padStart(2, '0')} min`;
            message.textContent = `Löysit kaikki parit ${attempts} yrityksellä ajassa ${timeString}!`;
            modal.style.display = 'flex';
        }, 1500);
    }
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
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
    stopTimer();
    startTime = null;
    timerDisplay.textContent = 'Aika: 0:00 min';
}
export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    return cardElement;
}

export function flipCard(cardElement, callback) {
    if (cardElement.classList.contains('flipped')) return;
    cardElement.classList.add('flipped');
    const img = document.createElement('img');
    img.src = `./images/${cardElement.dataset.theme}/${cardElement.dataset.card}`;
    img.alt = 'Muistipelikortti';
    img.classList.add('card-image');
    cardElement.appendChild(img);
    callback(cardElement);
}
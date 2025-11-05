export function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    return cardElement;
}

export function flipCard(cardElement, callback) {
    if (cardElement.classList.contains('flipped')) return;
    cardElement.classList.add('flipped');
            // Lisää kuva korttiin
    const img = document.createElement('img');
    img.src = `./images/${cardElement.dataset.card}`;
    img.alt = 'Muistipelikortti';
    img.classList.add('card-image');
    cardElement.appendChild(img);
    /*cardElement.textContent = cardElement.dataset.card;*/
    callback(cardElement);
}
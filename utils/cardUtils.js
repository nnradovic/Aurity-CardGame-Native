const parseCardValue = (value) => {
    switch (value) {
        case 'ACE':
            return '15';
        case 'KING':
            return '14';
        case 'QUEEN':
            return '13';
        case 'JACK':
            return '12';
        default:
            return value;
    }
};

export const cardValueToInt = (card) => {
    card.value = parseInt(parseCardValue(card.value));
    return card;
};

export const compareCards = (currCard, newCard, isBigger) => ((currCard.value < newCard.value && isBigger) || (currCard.value > newCard.value && !isBigger)) ? 'You Win!' : 'You Lose';
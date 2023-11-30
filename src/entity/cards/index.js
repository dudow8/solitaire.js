const SET = {
    ACE:    { index: 0, value: 'A' },
    TWO:    { index: 1, value: '2' },
    THREE:  { index: 2, value: '3' },
    FOUR:   { index: 3, value: '4' },
    FIVE:   { index: 4, value: '5' },
    SIX:    { index: 5, value: '6' },
    SEVEN:  { index: 6, value: '7' },
    EIGHT:  { index: 7, value: '8' },
    NINE:   { index: 8, value: '9' },
    TEN:    { index: 9, value: '10' },
    JACK:   { index: 10, value: 'J' },
    QUEEN:  { index: 11, value: 'Q' },
    KING:   { index: 12, value: 'K' },
};

const SUITS = {
    HEART: {
        suit: 'heart',
        neast: ['spade', 'club'],
    },
    SPADE: {
        suit: 'spade',
        neast: ['heart', 'diamond'],
    },
    CLUB: {
        suit: 'club',
        neast: ['heart', 'diamond'],
    },
    DIAMOND: {
        suit: 'diamond',
        neast: ['spade', 'club'],
    },
};

const cardFactory = (card, suit, flipped = false) => ({
    ...card,
    ...suit,
    flipped,
});

const shuffleCards = (cards) => {
    const seed = () => Math.random() - 0.5;
    return Array.from(cards).sort(seed);
}

const isValidCardSetSequence = (cardA, cardB) => {
    if (cardA.index + 1 === cardB.index)
        return true;

    return false;
};

const set_keys = Object.keys(SET);
const cards = [
    ...set_keys.map((card) => cardFactory(SET[card], SUITS.HEART)),
    ...set_keys.map((card) => cardFactory(SET[card], SUITS.SPADE)),
    ...set_keys.map((card) => cardFactory(SET[card], SUITS.CLUB)),
    ...set_keys.map((card) => cardFactory(SET[card], SUITS.DIAMOND)),
];

module.exports = {
    SET,
    SUITS,
    cards,
    cardFactory,
    shuffleCards,
    isValidCardSetSequence,
};

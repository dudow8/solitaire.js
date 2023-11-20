const set = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const suits = {
    heart: {
        neast: ['spade', 'club'],
    },
    spade: {
        neast: ['heart', 'diamond'],
    },
    club: {
        neast: ['heart', 'diamond'],
    },
    diamond: {
        neast: ['spade', 'club'],
    },
};

const cards = [
    ...set.map((value, index) => ({
        index,
        value,
        suit: 'heart',
    })),
    ...set.map((value, index) => ({
        index,
        value,
        suit: 'spade',
    })),
    ...set.map((value, index) => ({
        index,
        value,
        suit: 'club',
    })),
    ...set.map((value, index) => ({
        index,
        value,
        suit: 'diamond',
    })),
];

const shuffleCards = cards => {
    return Array.from(cards).sort(() => Math.random() - 0.5);
}

const isValidCardSetSequence = (cardA, cardB) => {
    if (cardA.index + 1 === cardB.index)
        return true;

    return false;
};

module.exports = {
    cards,
    suits,
    shuffleCards,
    isValidCardSetSequence,
};

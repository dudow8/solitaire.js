const {
    cards,
    shuffleCards,
    isValidCardSetSequence
} = require('./index');

describe('Entity/Cards', () => {
    const cardPack = shuffleCards(cards);

    test('generation and shuffle', () => {
        expect(cards.length).toBe(52);
        expect(cardPack.length).toBe(52);
        expect(cardPack).not.toEqual(cards);
        expect(cardPack.length).toBe(cards.length);
    });

    test('isValidCardSetSequence()', () => {
        const bottomCard = {
            index: 0,
            value: 'ACE',
            suit: 'heart',
        };
        const matchingTopCard = {
            index: 1,
            value: '2',
            suit: 'heart',
        };
        const mismatchingTopCard = {
            index: 2,
            value: '3',
            suit: 'heart',
        };

        expect(isValidCardSetSequence(bottomCard, matchingTopCard)).toBeTruthy();
        expect(isValidCardSetSequence(bottomCard, mismatchingTopCard)).toBeFalsy();
    })
});

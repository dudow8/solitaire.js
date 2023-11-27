const {
    SET,
    SUITS,
    cards,
    cardFactory,
    shuffleCards,
    isValidCardSetSequence,
} = require('./index');

describe('Entity/Cards', () => {
    describe('cardFactory', () => {
        test('Card pack should be instantiated', () => {
            const sequence = [
                cardFactory(SET.ACE, SUITS.HEART),
                cardFactory(SET.TWO, SUITS.HEART),
                cardFactory(SET.THREE, SUITS.HEART),
            ];
            const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
            const heartAceCardMock = {
                index: 0,
                value: 'A',
                suit: 'heart',
                neast: ['spade', 'club'],
                flipped: false,
            };
            expect(heartAceCard).toEqual(heartAceCardMock);
            expect(cards.length).toBe(52);
            expect(cards.slice(0, 3)).toEqual(sequence);
        });
    });

    describe('shuffleCards()', () => {
        const cardPack = shuffleCards(cards);
        test('Card pack should be shuffled and differ from the original sequential set', () => {
            const sequence = [
                cardFactory(SET.ACE, SUITS.HEART),
                cardFactory(SET.TWO, SUITS.HEART),
                cardFactory(SET.THREE, SUITS.HEART),
            ];
            expect(cardPack.length).toBe(52);
            expect(cardPack).not.toEqual(cards);
            expect(cardPack.length).toBe(cards.length);
            expect(cardPack.slice(0, 3)).not.toEqual(sequence);
        });
    });

    describe('isValidCardSetSequence()', () => {
        test('Should return true if the top card has a valid sequence index over the bottom card, else false', () => {
            const bottomCard = cardFactory(SET.ACE, SUITS.HEART);
            const matchingTopCard = cardFactory(SET.TWO, SUITS.HEART);
            const mismatchingTopCard = cardFactory(SET.THREE, SUITS.HEART);

            expect(isValidCardSetSequence(bottomCard, matchingTopCard)).toBeTruthy();
            expect(isValidCardSetSequence(bottomCard, mismatchingTopCard)).toBeFalsy();
        })
    });
});

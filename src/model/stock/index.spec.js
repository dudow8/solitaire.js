const {
    flipStockCard,
} = require('./index');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../entity/cards');

describe('Model/Stock', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const heartTreeCard = cardFactory(SET.THREE, SUITS.HEART);

    describe('flipStockCard()', () => {
        test('Active index should be 0 when there`s no previous active card', () => {
            const state = {
                stock: {
                    active: {
                        card: null,
                        index: null,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toEqual(heartAceCard);
            expect(event.payload.active_index).toBe(0);
        });

        test('Active index should be a sequential index when there`s a previous active card', () => {
            const state = {
                stock: {
                    active: {
                        card: heartTwoCard,
                        index: 1,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toEqual(heartTreeCard);
            expect(event.payload.active_index).toBe(2);
        });

        test('Active index should be null when next index is bigger then stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: heartTreeCard,
                        index: 2,
                    },
                    pile: [heartAceCard, heartTwoCard, heartTreeCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toBeNull();
            expect(event.payload.active_index).toBeNull();
        });

        test('Next active index should be null with only one card in the stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: heartAceCard,
                        index: 0,
                    },
                    pile: [heartAceCard]
                }
            };

            const event = flipStockCard(state);
            expect(event.payload.active_card).toBeNull();
            expect(event.payload.active_index).toBeNull();
        });

        test('Next active index should be always null with no cards in the stock pile', () => {
            const state = {
                stock: {
                    active: {
                        card: null,
                        index: null,
                    },
                    pile: []
                }

            };
            const event = flipStockCard(state);
            const event_next = flipStockCard(state);

            expect(event).toBeNull();
            expect(event_next).toBeNull();
        });
    });
});

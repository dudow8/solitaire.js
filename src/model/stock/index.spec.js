const {
    flipStockCard,
} = require('./index');

describe('Model/Stock', () => {
    const heartAceCard = {
        index: 0,
        value: 'ACE',
        suit: 'heart',
    };
    const heartTwoCard = {
        index: 1,
        value: '2',
        suit: 'heart',
    };
    const heartTreeCard = {
        index: 2,
        value: '3',
        suit: 'heart',
    };

    describe('flipStockCard()', () => {
        test('with no active card', () => {
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

        test('with previous active card', () => {
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

        test('with last card in the pile active', () => {
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

        test('with one card in the pile', () => {
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

        test('with no cards in the pile', () => {
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
            expect(event).toBeNull();
        });
    });
});

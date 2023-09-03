const {
    moveCardStackFromTableauToFoundation,
    moveCardStackFromStockToFoundation,
} = require('./index');

describe('Foundation', () => {
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
    const spadeTwoCard = {
        index: 1,
        value: '2',
        suit: 'spade',
    };
    const spadeKingCard = {
        index: 0,
        value: 'KING',
        suit: 'spade',
    };

    describe('moveCardStackFromTableauToFoundation()', () => {
        test('valid move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [heartTwoCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 1
            };

            const event = moveCardStackFromTableauToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid set sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [heartTreeCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 1
            };

            const event = moveCardStackFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('invalid suit sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [spadeTwoCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 1
            };

            const event = moveCardStackFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('valid empty destination foundation move', () => {
            const state = {
                foundation: {
                    1: [],
                },
                tableau: {
                    1: [heartAceCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 1
            };

            const event = moveCardStackFromTableauToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid empty destination foundation move', () => {
            const state = {
                foundation: {
                    1: [],
                },
                tableau: {
                    1: [heartTwoCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 1
            };

            const event = moveCardStackFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardStackFromStockToFoundation()', () => {
        test('valid move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                stock: [heartTwoCard],
            };
            const move = {
                position: 0,
                to: 1
            };

            const event = moveCardStackFromStockToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid set sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                stock: [heartTreeCard],
            };
            const move = {
                position: 0,
                to: 1
            };

            const event = moveCardStackFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('invalid suit sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                stock: [spadeTwoCard],
            };
            const move = {
                position: 0,
                to: 1
            };

            const event = moveCardStackFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('valid empty destination foundation move', () => {
            const state = {
                foundation: {
                    1: [],
                },
                stock: [heartAceCard]
            };
            const move = {
                position: 0,
                to: 1
            };

            const event = moveCardStackFromStockToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid empty destination foundation move', () => {
            const state = {
                foundation: {
                    1: [],
                },
                stock: [heartTwoCard]
            };
            const move = {
                position: 0,
                to: 1
            };

            const event = moveCardStackFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });
    });

});

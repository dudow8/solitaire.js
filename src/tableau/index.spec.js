const {
    moveCardStackFromPileToTableau,
    moveCardStackFromStockToTableau,
    moveCardStackFromFoundationToTableau,
} = require('./index');

describe('Tableau', () => {
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

    describe('moveCardStackFromPileToTableau()', () => {
        test('valid move', () => {
            const state = {
                tableau: {
                    1: [heartAceCard],
                    2: [spadeTwoCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromPileToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid set sequence move', () => {
            const state = {
                tableau: {
                    1: [heartAceCard],
                    2: [spadeKingCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromPileToTableau(state, move);
            expect(event).toBeNull();
        });

        test('invalid suit sequence move', () => {
            const state = {
                tableau: {
                    1: [heartAceCard],
                    2: [heartTwoCard],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromPileToTableau(state, move);
            expect(event).toBeNull();
        });

        test('valid empty destination pile move', () => {
            const state = {
                tableau: {
                    1: [spadeKingCard],
                    2: [],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromPileToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid empty destination pile move', () => {
            const state = {
                tableau: {
                    1: [heartTwoCard],
                    2: [],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromPileToTableau(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardStackFromStockToTableau()', () => {
        test('valid move', () => {
            const state = {
                stock: [heartAceCard],
                tableau: {
                    1: [],
                    2: [spadeTwoCard],
                }
            };
            const move = {
                position: 0,
                to: 2,
            };

            const event = moveCardStackFromStockToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid set sequence move', () => {
            const state = {
                stock: [heartAceCard],
                tableau: {
                    1: [],
                    2: [spadeKingCard],
                }
            };
            const move = {
                position: 0,
                to: 2,
            };

            const event = moveCardStackFromStockToTableau(state, move);
            expect(event).toBeNull();
        });

        test('invalid suit sequence move', () => {
            const state = {
                stock: [heartAceCard],
                tableau: {
                    1: [heartAceCard],
                    2: [heartTwoCard],
                }
            };
            const move = {
                position: 0,
                to: 2,
            };

            const event = moveCardStackFromStockToTableau(state, move);
            expect(event).toBeNull();
        });

        test('valid empty destination pile move', () => {
            const state = {
                stock: [spadeKingCard],
                tableau: {
                    1: [spadeKingCard],
                    2: [],
                }
            };
            const move = {
                position: 0,
                to: 2
            };

            const event = moveCardStackFromStockToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid empty destination pile move', () => {
            const state = {
                stock: [heartTwoCard],
                tableau: {
                    1: [],
                    2: [],
                }
            };
            const move = {
                from: 1,
                position: 0,
                to: 2
            };

            const event = moveCardStackFromStockToTableau(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardStackFromFoundationToTableau()', () => {
        test('valid move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [],
                    2: [spadeTwoCard],
                }
            };
            const move = {
                from: 1,
                to: 2,
            };

            const event = moveCardStackFromFoundationToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid set sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [],
                    2: [spadeKingCard],
                }
            };
            const move = {
                from: 1,
                to: 2,
            };

            const event = moveCardStackFromFoundationToTableau(state, move);
            expect(event).toBeNull();
        });

        test('invalid suit sequence move', () => {
            const state = {
                foundation: {
                    1: [heartAceCard],
                },
                tableau: {
                    1: [heartAceCard],
                    2: [heartTwoCard],
                }
            };
            const move = {
                from: 1,
                to: 2,
            };

            const event = moveCardStackFromFoundationToTableau(state, move);
            expect(event).toBeNull();
        });

        test('valid empty destination pile move', () => {
            const state = {
                foundation: {
                    1: [spadeKingCard],
                },
                tableau: {
                    1: [spadeKingCard],
                    2: [],
                }
            };
            const move = {
                from: 1,
                to: 2
            };

            const event = moveCardStackFromFoundationToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload).toEqual(move);
        });

        test('invalid empty destination pile move', () => {
            const state = {
                foundation: {
                    1: [heartTwoCard],
                },
                tableau: {
                    1: [],
                    2: [],
                }
            };
            const move = {
                from: 1,
                to: 2
            };

            const event = moveCardStackFromFoundationToTableau(state, move);
            expect(event).toBeNull();
        });
    });
});

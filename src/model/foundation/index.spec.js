const {
    moveCardFromTableauToFoundation,
    moveCardFromStockToFoundation,
} = require('./index');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../entity/cards');

describe('Model/Foundation', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const heartTreeCard = cardFactory(SET.THREE, SUITS.HEART);
    const spadeTwoCard = cardFactory(SET.TWO, SUITS.SPADE);

    describe('moveCardFromTableauToFoundation()', () => {
        test('Should return a valid event with a valid move', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [heartTwoCard],
                    }
                }
            };
            const move = {
                tableauPileIndex: 1,
                foundationPileIndex: 1
            };

            const event = moveCardFromTableauToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartTwoCard);
        });

        test('Should return null when the top card is an invalid set sequence', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [heartTreeCard],
                    }
                }
            };
            const move = {
                tableauPileIndex: 1,
                foundationPileIndex: 1
            };

            const event = moveCardFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid suit sequence', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [spadeTwoCard],
                    }
                }
            };
            const move = {
                tableauPileIndex: 1,
                foundationPileIndex: 1
            };

            const event = moveCardFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('Should return a valid event when moving an accepted card to an empty foundation pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                    }
                },
                tableau: {
                    piles: {
                        1: [heartAceCard],
                    }
                }
            };
            const move = {
                tableauPileIndex: 1,
                foundationPileIndex: 1
            };

            const event = moveCardFromTableauToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartAceCard);
        });

        test('Should return null when moving a not accepted card to an empty foundation pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                    }
                },
                tableau: {
                    piles: {
                        1: [heartTwoCard],
                    }
                }
            };
            const move = {
                tableauPileIndex: 1,
                foundationPileIndex: 1
            };

            const event = moveCardFromTableauToFoundation(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardFromStockToFoundation()', () => {
        test('Should return a valid event with a valid move', () => {
            const state = {
                foundation: {
                    piles: {
                        1: []
                    },
                },
                stock: {
                    pile: [heartAceCard]
                },
            };
            const move = {
                stockIndex: 0,
                foundationPileIndex: 1
            };

            const event = moveCardFromStockToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartAceCard);
        });

        test('Should return null when the top card is an invalid set sequence', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                stock: {
                    pile: [heartTreeCard]
                },
            };
            const move = {
                stockIndex: 0,
                foundationPileIndex: 1
            };

            const event = moveCardFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid suit sequence', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                stock: {
                    pile: [spadeTwoCard]
                },
            };
            const move = {
                stockIndex: 0,
                foundationPileIndex: 1
            };

            const event = moveCardFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });

        test('Should return a valid event when moving an accepted card to an empty foundation pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                    }
                },
                stock: {
                    pile: [heartAceCard]
                }
            };
            const move = {
                stockIndex: 0,
                foundationPileIndex: 1
            };

            const event = moveCardFromStockToFoundation(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartAceCard);
        });

        test('Should return null when moving a not accepted card to an empty foundation pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [],
                    }
                },
                stock: {
                    pile: [heartTwoCard]
                }
            };
            const move = {
                stockIndex: 0,
                foundationPileIndex: 1
            };

            const event = moveCardFromStockToFoundation(state, move);
            expect(event).toBeNull();
        });
    });

});

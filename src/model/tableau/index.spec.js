const {
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
} = require('./index');
const {
    SET,
    SUITS,
    cardFactory,
} = require('../../entity/cards');

describe('Model/Tableau', () => {
    const heartAceCard = cardFactory(SET.ACE, SUITS.HEART);
    const heartTwoCard = cardFactory(SET.TWO, SUITS.HEART);
    const spadeTwoCard = cardFactory(SET.TWO, SUITS.SPADE);
    const heartThreeCard = cardFactory(SET.THREE, SUITS.HEART);
    const spadeKingCard = cardFactory(SET.KING, SUITS.SPADE);

    describe('moveCardStackBetweenTableauPiles()', () => {
        test('Should return a valid event with a valid move', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [spadeTwoCard, heartAceCard],
                        2: [heartThreeCard],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
                toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).not.toBeNull();

            expect(event.payload.card_stack.length).toBe(2);
        });

        test('Should return null with missing arguments', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [spadeTwoCard, heartAceCard],
                        2: [heartThreeCard],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                // fromTableauPileIndex: null,
                // fromPileCardPosition: 0,
                // toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).toBeNull();
        });

        test('Should return null if the origin and destination pile are the same', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [spadeTwoCard, heartAceCard],
                        2: [heartThreeCard],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 1,
                toTableauPileIndex: 1
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid set sequence', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [heartAceCard],
                        2: [spadeKingCard],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
                toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid suit sequence', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [heartAceCard],
                        2: [heartTwoCard],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
                toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).toBeNull();
        });

        test('Should return a valid event when moving an accepted card to an empty tableau pile destination', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [spadeKingCard],
                        2: [],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
                toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card_stack.length).toBe(1);
        });

        test('Should return null when moving a not accepted card to an empty tableau pile destination', () => {
            const state = {
                tableau: {
                    piles: {
                        1: [heartTwoCard],
                        2: [],
                        3: [],
                        4: [],
                    }
                }
            };
            const move = {
                fromTableauPileIndex: 1,
                fromPileCardPosition: 0,
                toTableauPileIndex: 2
            };

            const event = moveCardStackBetweenTableauPiles(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardFromStockToTableau()', () => {
        test('Should return a valid event with a valid move', () => {
            const state = {
                stock: {
                    pile: [heartAceCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeTwoCard],
                    }
                }
            };

            const move = {
                stockIndex: 0,
                tableauPileIndex: 2,
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartAceCard);
        });

        test('Should return null with missing arguments', () => {
            const state = {
                stock: {
                    pile: [heartAceCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeTwoCard],
                    }
                }
            };

            const move = {
                // stockIndex: 0,
                // tableauPileIndex: 2,
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid set sequence', () => {
            const state = {
                stock: {
                    pile: [heartAceCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeKingCard],
                    }
                }
            };
            const move = {
                stockIndex: 0,
                tableauPileIndex: 2,
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).toBeNull();
        });

        test('Should return null when the top card is an invalid suit sequence', () => {
            const state = {
                stock: {
                    pile: [heartAceCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [heartTwoCard],
                    }
                }
            };
            const move = {
                stockIndex: 0,
                tableauPileIndex: 2,
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).toBeNull();
        });

        test('Should return a valid event when moving an accepted card to an empty tableau pile destination', () => {
            const state = {
                stock: {
                    pile: [spadeKingCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                    }
                }
            };
            const move = {
                stockIndex: 0,
                tableauPileIndex: 2
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(spadeKingCard);
        });

        test('Should return null when moving a not accepted card to an empty tableau pile destination', () => {
            const state = {
                stock: {
                    pile: [heartTwoCard]
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                    }
                }
            };
            const move = {
                stockIndex: 0,
                tableauPileIndex: 2
            };

            const event = moveCardFromStockToTableau(state, move);
            expect(event).toBeNull();
        });
    });

    describe('moveCardFromFoundationToTableau()', () => {
        test('Should return a valid event with a valid move', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeTwoCard],
                    }
                }
            };
            const move = {
                foundationPileIndex: 1,
                tableauPileIndex: 2,
            };

            const event = moveCardFromFoundationToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(heartAceCard);
        });

        test('Should return null with missing arguments', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [spadeTwoCard],
                    }
                }
            };
            const move = {
                // foundationPileIndex: 1,
                // tableauPileIndex: 2,
            };

            const event = moveCardFromFoundationToTableau(state, move);
            expect(event).toBeNull();
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
                        1: [],
                        2: [spadeKingCard],
                    }
                }
            };
            const move = {
                foundationPileIndex: 1,
                tableauPileIndex: 2,
            };

            const event = moveCardFromFoundationToTableau(state, move);
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
                        1: [],
                        2: [heartTwoCard],
                    }
                }
            };
            const move = {
                foundationPileIndex: 1,
                tableauPileIndex: 2,
            };

            const event = moveCardFromFoundationToTableau(state, move);
            expect(event).toBeNull();
        });

        test('Should return a valid event when moving an accepted card to an empty tableau pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [spadeKingCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                    }
                }
            };
            const move = {
                foundationPileIndex: 1,
                tableauPileIndex: 2
            };

            const event = moveCardFromFoundationToTableau(state, move);
            expect(event).not.toBeNull();
            expect(event.payload.card).toEqual(spadeKingCard);
        });

        test('Should return null when moving a not accepted card to an empty tableau pile destination', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartTwoCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [],
                        2: [],
                    }
                }
            };
            const move = {
                foundationPileIndex: 1,
                tableauPileIndex: 2
            };

            const event = moveCardFromFoundationToTableau(state, move);
            expect(event).toBeNull();
        });
    });
});

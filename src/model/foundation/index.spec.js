const {
    moveCardFromTableauToFoundation,
    moveCardFromStockToFoundation,
} = require('./index');

describe('Model/Foundation', () => {
    const heartAceCard = {
        index: 0,
        value: 'A',
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

    describe('moveCardFromTableauToFoundation()', () => {
        test('valid move', () => {
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

        test('invalid set sequence move', () => {
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

        test('invalid suit sequence move', () => {
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

        test('valid empty destination foundation move', () => {
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

        test('invalid empty destination foundation move', () => {
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
        test('valid move', () => {
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

        test('invalid set sequence move', () => {
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

        test('invalid suit sequence move', () => {
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

        test('valid empty destination foundation move', () => {
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

        test('invalid empty destination foundation move', () => {
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

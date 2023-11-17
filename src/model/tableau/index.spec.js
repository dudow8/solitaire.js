const {
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
} = require('./index');

describe('Model/Tableau', () => {
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
    const heartThreeCard = {
        index: 2,
        value: '3',
        suit: 'heart',
    };
    const spadeKingCard = {
        index: 0,
        value: 'KING',
        suit: 'spade',
    };

    describe('moveCardStackBetweenTableauPiles()', () => {
        test('valid move', () => {
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

        test('invalid set sequence move', () => {
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

        test('invalid suit sequence move', () => {
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

        test('valid empty destination pile move', () => {
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

        test('invalid empty destination pile move', () => {
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
        test('valid move', () => {
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

        test('invalid set sequence move', () => {
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

        test('invalid suit sequence move', () => {
            const state = {
                stock: {
                    pile: [heartAceCard]
                },
                tableau: {
                    piles: {
                        1: [heartAceCard],
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

        test('valid empty destination pile move', () => {
            const state = {
                stock: {
                    pile: [spadeKingCard]
                },
                tableau: {
                    piles: {
                        1: [spadeKingCard],
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

        test('invalid empty destination pile move', () => {
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
        test('valid move', () => {
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

        test('invalid set sequence move', () => {
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

        test('invalid suit sequence move', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [heartAceCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [heartAceCard],
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

        test('valid empty destination pile move', () => {
            const state = {
                foundation: {
                    piles: {
                        1: [spadeKingCard],
                    }
                },
                tableau: {
                    piles: {
                        1: [spadeKingCard],
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

        test('invalid empty destination pile move', () => {
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

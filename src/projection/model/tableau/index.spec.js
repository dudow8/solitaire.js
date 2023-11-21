const TableauProjection = require('./index');
const { Game } = require('../../../model');

describe('Projection/Tableau', () => {
    const heartAceCard = {
        index: 0,
        value: 'ACE',
        suit: 'heart',
    };
    const heartTwoCard = {
        index: 1,
        value: '2',
        suit: 'heart',
        flipped: true,
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
        flipped: true,
    };

    describe('gameInitialized', () => {
        const gameInitialized = TableauProjection['solitaire/game-initialized'];

        test('Should have a correct tableau structure after game initialized', () => {
            const event = Game.initializeGame();
            const snapshot = gameInitialized({}, event);

            expect(snapshot.piles[1].length).toBe(1);
            expect(snapshot.piles[2].length).toBe(2);
            expect(snapshot.piles[3].length).toBe(3);
            expect(snapshot.piles[4].length).toBe(4);
            expect(snapshot.piles[5].length).toBe(5);
            expect(snapshot.piles[6].length).toBe(6);
            expect(snapshot.piles[7].length).toBe(7);
        });
    });

    describe('cardStackMovedBetweenTableauPiles', () => {
        const cardStackMovedBetweenTableauPiles = TableauProjection['tableau/card-stack-moved-between-tableau-piles'];

        test('Should move the cards to the new tableau pile', () => {
            const state = {
                piles: {
                    1: [spadeTwoCard, heartAceCard],
                    2: [heartThreeCard],
                }
            };
            const event = {
                payload: {
                    from_pile: 1,
                    from_pile_card_position: 0,
                    to_pile: 2,
                    card_stack: [spadeTwoCard, heartAceCard],
                }
            };

            const snapshot = cardStackMovedBetweenTableauPiles(state, event);

            expect(snapshot.piles[1].length).toBe(0);
            expect(snapshot.piles[2].length).toBe(3);
            expect(snapshot.piles[2]).toEqual([heartThreeCard, spadeTwoCard, heartAceCard]);
        });

        test('Should flip the top card after moving a card', () => {
            const state = {
                piles: {
                    1: [heartTwoCard, spadeKingCard, spadeTwoCard, heartAceCard],
                    2: [heartThreeCard],
                }
            };
            const event = {
                payload: {
                    from_pile: 1,
                    from_pile_card_position: 2,
                    to_pile: 2,
                    card_stack: [spadeTwoCard, heartAceCard],
                }
            };

            const snapshot = cardStackMovedBetweenTableauPiles(state, event);

            expect(snapshot.piles[1].length).toBe(2);
            expect(snapshot.piles[2].length).toBe(3);
            expect(snapshot.piles[2]).toEqual([heartThreeCard, spadeTwoCard, heartAceCard]);
            expect(snapshot.piles[1][0].flipped).toBe(true);
            expect(snapshot.piles[1][1].flipped).toBe(false);
        });
    });

    describe('cardMovedFromStockToTableau', () => {
        const cardMovedFromStockToTableau = TableauProjection['tableau/card-moved-from-stock-to-tableau'];

        test('valid event data', () => {
            const state = {
                piles: {
                    1: [spadeTwoCard],
                    2: [heartThreeCard],
                }
            }
            const event = {
                payload: {
                    stock_index: 1,
                    tableau_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromStockToTableau(state, event);
            expect(snapshot.piles[1].length).toBe(2);
            expect(snapshot.piles[2].length).toBe(1);
        });
    });

    describe('cardMovedFromFoundationToTableau', () => {
        const cardMovedFromFoundationToTableau = TableauProjection['tableau/card-moved-from-foundation-to-tableau'];

        test('valid event data', () => {
            const state = {
                piles: {
                    1: [spadeTwoCard],
                    2: [heartThreeCard],
                }
            }
            const event = {
                payload: {
                    foundation_pile: 1,
                    tableau_pile: 1,
                    card: heartAceCard,
                }
            };

            const snapshot = cardMovedFromFoundationToTableau(state, event);
            expect(snapshot.piles[1].length).toBe(2);
            expect(snapshot.piles[2].length).toBe(1);
        })
    });

    describe('cardMovedFromTableauToFoundation', () => {
        const cardMovedFromTableauToFoundation = TableauProjection['foundation/card-moved-from-tableau-to-foundation'];

        test('Should move out the card from tableau pile', () => {
            const state = {
                piles: {
                    1: [spadeTwoCard],
                    2: [heartThreeCard],
                }
            }
            const event = {
                payload: {
                    tableau_pile: 1,
                    foundation_pile: 1,
                    card: spadeTwoCard,
                }
            };

            const snapshot = cardMovedFromTableauToFoundation(state, event);
            expect(snapshot.piles[1].length).toBe(0);
            expect(snapshot.piles[2].length).toBe(1);
        });

        test('Should flip the top card after moving a card', () => {
            const state = {
                piles: {
                    1: [spadeKingCard, heartTwoCard, spadeTwoCard],
                    2: [heartThreeCard],
                }
            }
            const event = {
                payload: {
                    tableau_pile: 1,
                    foundation_pile: 2,
                    card: spadeTwoCard,
                }
            };

            const snapshot = cardMovedFromTableauToFoundation(state, event);
            expect(snapshot.piles[1].length).toBe(2);
            expect(snapshot.piles[2].length).toBe(1);
            expect(snapshot.piles[1][0].flipped).toBe(true);
            expect(snapshot.piles[1][1].flipped).toBe(false);
        });

        test('Should not throw an error after moving a card from pile and have no remaing card to flip', () => {
            const state = {
                piles: {
                    1: [spadeTwoCard],
                    2: [heartThreeCard],
                }
            }
            const event = {
                payload: {
                    tableau_pile: 1,
                    foundation_pile: 0,
                    card: spadeTwoCard,
                }
            };

            expect(() => {
                const snapshot = cardMovedFromTableauToFoundation(state, event);
            }).not.toThrowError();
        });
    });
});

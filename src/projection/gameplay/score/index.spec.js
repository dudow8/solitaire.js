const ScoreProjection = require('./index');
const {
    Game,
    Stock,
    Tableau,
    Foundation,
} = require('../../../model');

describe('Projection/Score', () => {
    describe('gameInitialized()', () => {
        const gameInitialized = ScoreProjection[Game.EVENTS.GAME_INITIALIZED];

        test('score and movements should be zero', () => {
            const payload = {};
            const state = {};
            const snapshot = gameInitialized(state, payload);

            expect(snapshot.score).toBe(0);
            expect(snapshot.moves).toBe(0);
        });
    });

    describe('stockCardFlipped()', () => {
        const stockCardFlipped = ScoreProjection[Stock.EVENTS.STOCK_CARD_FLIPPED];

        test('score should not change but should compute one move', () => {
            const payload = {};
            const state = { score: 10, moves: 5 };
            const snapshot = stockCardFlipped(state, payload);

            expect(snapshot.score).toBe(10);
            expect(snapshot.moves).toBe(6);
        });
    });

    describe('cardMovedFromStockToFoundation()', () => {
        const cardMovedFromStockToFoundation =
            ScoreProjection[Foundation.EVENTS.CARD_MOVED_FROM_STOCK_TO_FOUNDATION];

        test('score should be incresased in 10 points and should compute one move', () => {
            const payload = {};
            const state = { score: 25, moves: 62 };
            const snapshot = cardMovedFromStockToFoundation(state, payload);

            expect(snapshot.score).toBe(35);
            expect(snapshot.moves).toBe(63);
        });
    });

    describe('cardMovedFromTableauToFoundation()', () => {
        const cardMovedFromTableauToFoundation =
            ScoreProjection[Foundation.EVENTS.CARD_MOVED_FROM_TABLEAU_TO_FOUNDATION];

        test('score should be incresased in 10 points and should compute one move', () => {
            const payload = {};
            const state = { score: 25, moves: 62 };
            const snapshot = cardMovedFromTableauToFoundation(state, payload);

            expect(snapshot.score).toBe(35);
            expect(snapshot.moves).toBe(63);
        });
    });

    describe('cardMovedFromFoundationToTableau()', () => {
        const cardMovedFromFoundationToTableau =
            ScoreProjection[Tableau.EVENTS.CARD_MOVED_FROM_FOUNDATION_TO_TABLEAU];

        test('score should be decreased in 10 points and should compute one move', () => {
            const payload = {};
            const state = { score: 25, moves: 10 };
            const snapshot = cardMovedFromFoundationToTableau(state, payload);

            expect(snapshot.score).toBe(10);
            expect(snapshot.moves).toBe(11);
        });

        test('score should not be less then zero after being decreased', () => {
            const payload = {};
            const state = { score: 5, moves: 10 };
            const snapshot = cardMovedFromFoundationToTableau(state, payload);

            expect(snapshot.score).toBe(0);
            expect(snapshot.moves).toBe(11);
        });
    });

    describe('cardMovedFromFoundationToTableau()', () => {
        const cardStackMovedBetweenTableauPiles =
            ScoreProjection[Tableau.EVENTS.CARD_STACK_MOVED_BETWEEN_TABLEAU_PILES];

        test('score should be incresased in 5 points and should compute one move', () => {
            const payload = {};
            const state = { score: 25, moves: 10 };
            const snapshot = cardStackMovedBetweenTableauPiles(state, payload);

            expect(snapshot.score).toBe(30);
            expect(snapshot.moves).toBe(11);
        });
    });

    describe('cardMovedFromStockToTableau()', () => {
        const cardMovedFromStockToTableau =
            ScoreProjection[Tableau.EVENTS.CARD_MOVED_FROM_STOCK_TO_TABLEAU];

        test('score should be incresased in 5 points and should compute one move', () => {
            const payload = {};
            const state = { score: 25, moves: 10 };
            const snapshot = cardMovedFromStockToTableau(state, payload);

            expect(snapshot.score).toBe(30);
            expect(snapshot.moves).toBe(11);
        });
    });
});

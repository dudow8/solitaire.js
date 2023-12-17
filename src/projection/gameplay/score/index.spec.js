const ScoreProjection = require('./index');
const Projection = require('../../../commons/projection');
const {
    Game,
    Stock,
    Tableau,
    Foundation,
} = require('../../../model');

describe('Projection/Score', () => {
    describe('onCreate()', () => {
        const onCreate = ScoreProjection[Projection.EVENTS.INITIALIZED];

        test('should return the initial value', () => {
            const state = onCreate();
            const expected_state = {
                score: 0,
                moves: 0,
                game_state: Game.STATE.NOT_STARTED,
            };

            expect(state).toEqual(expected_state);
        });
    });

    describe('gameInitialized()', () => {
        const gameInitialized = ScoreProjection[Game.EVENTS.GAME_INITIALIZED];

        test('score and movements should be zero', () => {
            const payload = {};
            const state = {};
            const snapshot = gameInitialized(state, payload);

            expect(snapshot.score).toBe(0);
            expect(snapshot.moves).toBe(0);
            expect(snapshot.game_state).toBe(Game.STATE.PLAYING);
        });
    });

    describe('gameCompleted()', () => {
        const gameInitialized = ScoreProjection[Game.EVENTS.GAME_COMPLETED];

        test('game_state should be completed', () => {
            const payload = {
                game_state: Game.STATE.COMPLETED,
            };
            const state = {
                score: 200,
                moves: 150,
                game_state: Game.STATE.PLAYING,
            };
            const snapshot = gameInitialized(state, payload);

            expect(snapshot.score).toBe(200);
            expect(snapshot.moves).toBe(150);
            expect(snapshot.game_state).toBe(Game.STATE.COMPLETED);
        });

        test('game_state should be playing', () => {
            const payload = {
                game_state: 'playing',
            };
            const state = {
                score: 0,
                moves: 0,
                game_state: 'playing',
            };
            const snapshot = gameInitialized(state, payload);

            expect(snapshot.score).toBe(0);
            expect(snapshot.moves).toBe(0);
            expect(snapshot.game_state).not.toBe(Game.EVENTS.PLAYING);
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

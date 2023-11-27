const {
    initializeGame,
} = require('./index');

describe('Model/Game', () => {
    describe('initializeGame()', () => {
        test('Should correclty distribute the sorted cards between the tableau piles and stock', () => {
            const event = initializeGame();
            const { payload: state } = event;

            expect(state.tableau['1'].length).toBe(1);
            expect(state.tableau['2'].length).toBe(2);
            expect(state.tableau['3'].length).toBe(3);
            expect(state.tableau['4'].length).toBe(4);
            expect(state.tableau['5'].length).toBe(5);
            expect(state.tableau['6'].length).toBe(6);
            expect(state.tableau['7'].length).toBe(7);

            expect(state.stock.length).toBe(24);
        });
    });
});

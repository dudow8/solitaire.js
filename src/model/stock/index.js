const selectNextIndex = (pile, active_index) => {
    if (active_index === null)
        return 0;

    if (active_index + 1 < pile.length)
        return active_index + 1

    return null;
}

const selectNextActiveCard = (pile, active_index) => {
    if (active_index !== null) {
        return pile[active_index];
    }

    return null;
};

const flipStockCard = (state) => {
    if (state.pile.length) {
        const active_index = selectNextIndex(state.pile, state.active.index);
        const active_card = selectNextActiveCard(state.pile, active_index);

        return {
            type: 'stock/stock-card-flipped',
            payload: {
                active_index,
                active_card,
            }
        }
    }

    return null;
};

module.exports = {
    flipStockCard
};

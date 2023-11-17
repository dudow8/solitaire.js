










const gameStateReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'NEW_GAME': {
            return { ...payload };
        }

        // Foundation
        case 'MOVE_CARD_STACK_FROM_TABLEAU_TO_FOUNDATION': {
            const stack = state.tableau[payload.from];
            const card = stack.slice(payload.position, 1);
            const pile = stack.slice(0, payload.position);

            const tableau = {
                ...state.tableau,
                [payload.from]: pile,
            }

            const foundation = {
                ...state.foundation,
                [payload.to]: [
                    ...state.foundation,
                    card,
                ]
            };

            return {
                ...state,
                tableau,
                foundation,
            };
        }

        case 'MOVE_CARD_STACK_FROM_STOCK_TO_FOUNDATION': {
            return state;
        }

        // Tableau
        case 'MOVE_CARD_STACK_FROM_TABLEAU_TO_TABLEAU': {
            return state;
        }

        case 'MOVE_CARD_STACK_FROM_STOCK_TO_TABLEAU': {
            return state;
        }

        case 'MOVE_CARD_STACK_FROM_FOUNDATION_TO_TABLEAU': {
            return state;
        }

        default: {
            return state;
        }
    }
};


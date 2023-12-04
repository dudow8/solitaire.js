import React, { useEffect, useState, createContext, useContext } from 'react';
import Application from '../../../application';
import { useSolitaireState } from '../state';
import { useCarousel } from '../carousel';

const KeyBindingContext = createContext(null);

const idle = () => ({});

const filterTableauValidPiles = (piles) => {
    const piles_keys = Object.keys(piles);
    const validPiles = piles_keys.filter(pile_idx => piles[pile_idx].length > 0);

    return validPiles;
}

const tableauPileCarousel = (direction, { tableau }, { tableau_pile: current_pile }) => {
    const piles = filterTableauValidPiles(tableau.piles);
    const { moveBackward, moveForward } = useCarousel(piles);

    if (piles.length) {
        const tableau_pile = direction === 'moveBackward'
            ? moveBackward(current_pile)
            : moveForward(current_pile);
        const tableau_card_position = tableau.piles[tableau_pile].length - 1;
        return {
            tableau_pile,
            tableau_card_position
        };
    }

    return idle();
};

const tableauCardPositionCarousel = (direction, { tableau }, { tableau_pile, tableau_card_position: curent_position }) => {
    if (tableau_pile !== undefined) {
        const pile = tableau.piles[tableau_pile];
        const cards = Object.keys(pile).filter(item => !pile[item].flipped);
        const { moveBackward, moveForward } = useCarousel(cards);

        if (cards.length) {
            const tableau_card_position = direction === 'moveBackward'
                ? moveBackward(curent_position.toString())
                : moveForward(curent_position.toString());
            return {
                tableau_pile,
                tableau_card_position,
            }
        }
    }

    return idle();
};

const predictTableauMove = ({ }, { tableau_pile, tableau_card_position, }) => {
    if (tableau_pile !== undefined, tableau_card_position !== undefined) {
        Application.predictTableauMove(tableau_pile, tableau_card_position);
    }
    return idle();
};

const keybinding = {
    'Escape': idle,
    'a': (...args) => tableauPileCarousel('moveBackward', ...args),
    'd': (...args) => tableauPileCarousel('moveForeward', ...args),
    'w': (...args) => tableauCardPositionCarousel('moveBackward', ...args),
    's': (...args) => tableauCardPositionCarousel('moveForeward', ...args),
    'ArrowUp': predictTableauMove,
    'ArrowDown': Application.predictStockMove,
    'ArrowLeft': Application.flipStockCard,
};

const useKeybinding = () => {
    const { tableau, stock } = useSolitaireState();
    const [state, setState] = useState({});
    const { tableau_pile, tableau_card_position } = state;

    const onkeydown = (e) => {
        const payload = { tableau, stock };
        const fn = keybinding[e.key];

        if (typeof fn === 'function') {
            const newState = fn(payload, state);
            setState(newState);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, [tableau, stock, tableau_pile, tableau_card_position]);

    return {
        tableau_pile,
        tableau_card_position,
    }
};

const KeyBindingProvider = ({ children }) => {
    const contextValue = useKeybinding();
    return (
        <KeyBindingContext.Provider value={contextValue}>
            {children}
        </KeyBindingContext.Provider>
    );
};

const useKeyBindingContext = () => {
    const contextValue = useContext(KeyBindingContext);
    return contextValue;
};

export {
    useKeyBindingContext,
    KeyBindingProvider,
};

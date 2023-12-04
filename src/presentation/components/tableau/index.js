import React from 'react';
import { styled } from 'styled-components';
import { useSolitaireState } from '../../hooks/state';
import { useDragAndDropContext } from '../../hooks/daganddrop';
import { useKeyBindingContext } from '../../hooks/keybinding';
import {
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
    predictTableauMove,
} from '../../../application';
import Card from '../card';

const Tableau = () => {
    const tableau = useSolitaireState('tableau');
    const dragAndDrop = useDragAndDropContext();
    const cardSelection = useKeyBindingContext();
    const piles = Object.keys(tableau.piles);

    const checkSelection = (pile, card_position) => {
        const { tableau_pile, tableau_card_position } = cardSelection;
        const selected = pile == tableau_pile && card_position == tableau_card_position;
        return selected;
    }

    const onDoubleClick = (e, flipped, pile, card_position) => {
        if (!flipped) {
            predictTableauMove(pile, card_position);
        }
    };

    const ondrag = (e, pile, card_position) => {
        const payload = {
            pile,
            card_position,
        };
        dragAndDrop.drag('solitaire/tableau-card', payload)
    };

    const ondrop = (e, to_tableau_pile_index) => {
        e.preventDefault();
        e.stopPropagation();

        const event = dragAndDrop.drop();
        const actions = {
            'solitaire/stock-card': (data) => {
                const { index: stock_active_index } = data;
                moveCardFromStockToTableau(stock_active_index, to_tableau_pile_index);
            },
            'solitaire/foundation-card': (data) => {
                const { pile: foundationPileIndex } = data;
                moveCardFromFoundationToTableau(foundationPileIndex, to_tableau_pile_index);
            },
            'solitaire/tableau-card': (data) => {
                const {
                    pile: from_tableau_pile_index,
                    card_position: from_pile_card_position,
                } = data;

                moveCardStackBetweenTableauPiles(
                    from_tableau_pile_index,
                    from_pile_card_position,
                    to_tableau_pile_index,
                );
            },
        };

        const drop = actions[event.content_type];
        if (typeof drop === 'function') {
            drop(event.payload);
        }
    }

    return (
        <Container>
            {piles.map((pile, pile_index) => (
                <Pile
                    key={pile_index}
                    onDrop={(e) => {
                        ondrop(e, pile);
                    }}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    onDragEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dragAndDrop.drop();
                    }}
                >
                    {tableau.piles[pile].map((card, card_index) => {
                        const selected = checkSelection(pile, card_index);
                        return (
                            <Card
                                selected={selected}
                                key={card_index}
                                label={card.value}
                                suit={card.suit}
                                flipped={card.flipped}
                                draggable={!card.flipped}
                                onDoubleClick={(e) => {
                                    onDoubleClick(e, card.flipped, pile, card_index);
                                }}
                                ondrag={(e) => {
                                    ondrag(e, pile, card_index);
                                }} />
                        )
                    })}
                </Pile>
            ))}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Pile = styled.div`
    min-height: 180px;
    width: 125px;
    margin: 0 6px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;

    &::before {
        content: "";
        height: 180px;
        width: 125px;
        top: 0px;
        left: 0px;
        border-radius: 10px;
        border: 2px solid #125734;
        margin-bottom: -180px;
    }

    > * {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
        margin-bottom: -145px;

        &:last-child {
            margin-bottom: 0px;
        }
    }
`;

export default Tableau;

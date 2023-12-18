import React from 'react';
import { styled } from 'styled-components';
import { useSolitaireState } from '../../hooks/state';
import { useDragAndDropContext } from '../../hooks/daganddrop';
import {
    moveCardFromStockToFoundation,
    moveCardFromTableauToFoundation,
} from '../../../application/factory';
import Card from '../card';

const Foundation = () => {
    const foundation = useSolitaireState('foundation');
    const dragAndDrop = useDragAndDropContext();
    const piles = [1, 2, 3, 4];

    const ondrag = (e, pile) => {
        const payload = {
            pile,
        };
        dragAndDrop.drag('solitaire/foundation-card', payload);
    };

    const ondrop = (e, pile) => {
        e.preventDefault();
        e.stopPropagation();

        const event = dragAndDrop.drop();
        const actions = {
            'solitaire/stock-card': (data) => {
                const { index: stock_active_index } = data;
                moveCardFromStockToFoundation(stock_active_index, pile);
            },
            'solitaire/tableau-card': (data) => {
                const { pile: tableau_pile_index } = data;
                moveCardFromTableauToFoundation(tableau_pile_index, pile);
            }
        };

        const drop = actions[event.content_type];
        if (typeof drop === 'function') {
            drop(event.payload);
        }
    }

    return (
        <Container>
            {piles.map((pile, key) => (
                <Pile
                    key={key}
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
                    {foundation &&
                        foundation.piles[pile].map((card, key) =>
                            <Card
                                key={key}
                                label={card.value}
                                suit={card.suit}
                                draggable
                                ondrag={(e) => {
                                    ondrag(e, pile);
                                }} />
                        )}
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
    width: 125px;
    height: 180px;
    margin: 0 5px;
    border: 2px solid #125734;
    border-radius: 10px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;

    > * {
        position: absolute;
    }
`;

export default Foundation;

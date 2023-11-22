import React from 'react';
import { styled } from 'styled-components';
import { useSolitaireState } from '../../hooks';
import {
    moveCardFromStockToFoundation,
    moveCardFromTableauToFoundation,
} from '../../../application';
import Card from '../card';

const Foundation = () => {
    const foundation = useSolitaireState('foundation');
    const piles = [1, 2, 3, 4];

    const ondrag = (e, pile) => {
        const data = {
            pile,
        };
        e.dataTransfer.setData("solitaire/foundation-card", JSON.stringify(data));
    };

    const ondrop = (e, pile) => {
        e.preventDefault();
        e.stopPropagation();

        const stockMove = e.dataTransfer.getData("solitaire/stock-card");
        const tableauMove = e.dataTransfer.getData("solitaire/tableau-card")

        if (stockMove) {
            const { index: stock_active_index } = JSON.parse(stockMove);
            moveCardFromStockToFoundation(stock_active_index, pile);
        }

        if (tableauMove) {
            const { pile: tableau_pile_index } = JSON.parse(tableauMove);
            moveCardFromTableauToFoundation(tableau_pile_index, pile);
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
                >
                    {foundation.piles[pile].map((card, key) =>
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

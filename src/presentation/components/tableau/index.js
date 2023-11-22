import React from 'react';
import { styled } from 'styled-components';
import { useSolitaireState } from '../../hooks';
import {
    moveCardStackBetweenTableauPiles,
    moveCardFromStockToTableau,
    moveCardFromFoundationToTableau,
} from '../../../application';
import Card from '../card';

const Tableau = () => {
    const tableau = useSolitaireState('tableau');
    const piles = Object.keys(tableau.piles);

    const ondrag = (e, pile, card_position) => {
        const data = {
            pile,
            card_position,
        };
        e.dataTransfer.setData("solitaire/tableau-card", JSON.stringify(data));
    };

    const ondrop = (e, to_tableau_pile_index) => {
        e.preventDefault();
        e.stopPropagation();

        const stockMove = e.dataTransfer.getData("solitaire/stock-card");
        const foundationMove = e.dataTransfer.getData("solitaire/foundation-card");
        const tableauMove = e.dataTransfer.getData("solitaire/tableau-card");

        if (stockMove) {
            const { index: stock_active_index } = JSON.parse(stockMove);
            moveCardFromStockToTableau(stock_active_index, to_tableau_pile_index);
        }

        if (foundationMove) {
            const { pile: foundationPileIndex } = JSON.parse(foundationMove);
            moveCardFromFoundationToTableau(foundationPileIndex, to_tableau_pile_index);
        }

        if (tableauMove) {
            const {
                pile: from_tableau_pile_index,
                card_position: from_pile_card_position
            } = JSON.parse(tableauMove);

            moveCardStackBetweenTableauPiles(
                from_tableau_pile_index,
                from_pile_card_position,
                to_tableau_pile_index
            );
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
                >
                    {tableau.piles[pile].map((card, card_index) =>
                        <Card
                            key={card_index}
                            label={card.value}
                            suit={card.suit}
                            flipped={card.flipped}
                            draggable={!card.flipped}
                            ondrag={(e) => {
                                ondrag(e, pile, card_index);
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
        margin-bottom: -145px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, .5);
    }
`;

export default Tableau;

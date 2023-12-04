import React from "react";
import { styled } from "styled-components";
import Card from "../card";
import { useSolitaireState } from "../../hooks/state";
import { useDragAndDropContext } from "../../hooks/daganddrop";
import { flipStockCard, predictStockMove } from '../../../application';

const Stock = () => {
    const stock = useSolitaireState('stock');
    const dragAndDrop = useDragAndDropContext();

    const hand = stock.pile.slice(stock.active.index !== null
        ? stock.active.index + 1
        : 0
    );
    const waste = stock.active.index !== null
        ? stock.pile.slice(0, stock.active.index + 1)
        : [];

    const onDoubleClick = (e) => {
        predictStockMove();
    };

    const ondrag = (e) => {
        const payload = stock.active;
        dragAndDrop.drag('solitaire/stock-card', payload);
    };

    return (
        <Container>
            <Waste>
                {waste.map((card, key) =>
                    <Card
                        key={key}
                        label={card.value}
                        suit={card.suit}
                        draggable
                        ondrag={(e) => { ondrag(e); }}
                        onDoubleClick={(e) => { onDoubleClick(e); }}
                    />
                )}
            </Waste>
            <Hand onClick={flipStockCard}>
                {hand.map((card, key) =>
                    <Card
                        key={key}
                        label={card.value}
                        suit={card.suit}
                        flipped={true}
                    />
                )}
            </Hand>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    height: 200px;
`;

const Hand = styled.div`
    width: 125px;
    height: 180px;
    margin: 0 5px;
    border-radius: 10px;
    box-sizing: border-box;
    border: 2px solid #125734;
    position: relative;

    &::before {
        content: '↺';
        position: absolute;
        transform: translate(
            calc(125px * 0.5 - 50%),
            calc(180px * 0.5 - 50%)
        );
        color: #125734;
        line-height: 50px;
        font-size: 90px;
    }

    > * {
        position: absolute;
    }
`;

const Waste = styled.div`
    width: 125px;
    height: 180px;
    margin: 0 5px;

    > * {
        position: absolute;
    }
`;

export default Stock;
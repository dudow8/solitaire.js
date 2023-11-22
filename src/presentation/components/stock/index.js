import React from "react";
import { styled } from "styled-components";
import Card from "../card";
import { useSolitaireState } from "../../hooks";
import { flipStockCard } from '../../../application';

const Stock = () => {
    const stock = useSolitaireState('stock');

    const hand = stock.pile.slice(stock.active.index + 1);
    const waste = stock.active.index !== null
        ? stock.pile.slice(0, stock.active.index + 1)
        : [];

    const ondrag = (e) => {
        e.dataTransfer.setData("solitaire/stock-card", JSON.stringify(stock.active));
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
                        ondrag={(e) => { ondrag(e); }} />
                )}
            </Waste>
            <Hand onClick={flipStockCard}>
                {hand.map((card, key) =>
                    <Card
                        key={key}
                        label={card.value}
                        suit={card.suit}
                        flipped={true} />
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
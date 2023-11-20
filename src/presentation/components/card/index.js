import React from 'react';
import { styled } from 'styled-components';

const suitSymbol = {
    club: '♣',
    diamond: '♦',
    heart: '♥',
    spade: '♠',
};

const Card = ({label, suit}) => (
    <CardWrapper className={suit} draggable={true}>
        <div className="headline">
            <h1>{label}</h1>
            <span>{suitSymbol[suit]}</span>
        </div>
        <div className='suit'>
            {suitSymbol[suit]}
        </div>
    </CardWrapper>
);

const CardWrapper = styled.div`
    cursor: default;
    user-select: none;
    margin: 0px;
    width: 135px;
    height: 200px;
    border-radius: 10px;
    border: 0.5px solid rgba(0, 0, 0, .2);
    box-shadow: -3px 3px 5px rgba(0, 0, 0, .2);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #F6EEE0;
    
    &.diamond,
    &.heart {
        color: #961316;
    }

    &.club,
    &.spade {
        color: #050A30;
    }

    > .headline {
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        line-height: 4.5em;
        font-family: 'Times New Roman', Times, serif;

        > h1 {
            padding: 0px;
            margin: 0px;
            font-size: 5em;
            letter-spacing: -0.1em;
        }

        > span {
            line-height: 0.65em;
            font-size: 3.5em;
        }
    }

    > .suit {
        margin-bottom: 10px;
        font-size : 10em;
        line-height: 0.7em;
        text-align: center;
    }
`;

export default Card;
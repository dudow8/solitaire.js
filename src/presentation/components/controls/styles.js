import styled from "styled-components";

export const Content = styled.div`
    border-bottom: 2px solid #125734;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 5px 25px;
    background-color: rgba(18,87,52, .2);
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Action = styled.button`
    height: 40px;
    border-radius: 10px;
    padding: 0px 20px;
    background-color: rgba(18,87,52, .6);
    color: rgba(255, 255, 255, .8);
    outline: none;
    border: none;
    transition: .2s ease;

    &:hover {
        background-color: rgba(18,87,52, 1);
        color: rgba(255, 255, 255, 1);
        transition: .2s ease;
    }
`;

export const Score = styled.div`
    color: white;
    gap: 30px;
    display: flex;
    justify-content: space-between;
`;

export const ScoreItem = styled.span`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
`;

export const ScoreItemLabel = styled.span`
    font-size: 14px;
    color: rgba(255, 255, 255, .8);
`;
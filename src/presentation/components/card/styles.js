import { styled, css } from 'styled-components';

const suitColor = {
    diamond: '#961316',
    heart: '#961316',
    club: '#050A30',
    spade: '#050A30',
};

const cardSelected = css`
    content: '';
    color: white;
    top: 0px;
    left: calc(50% - 6px);
    box-sizing: border-box;
    border: 12px solid transparent;
    border-top: 12px solid green;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    cursor: default;
    user-select: none;
    overflow: hidden;
    margin: 0px;
    width: 125px;
    height: 180px;
    border-radius: 10px;
    box-sizing: border-box;
    color: ${({ $suit }) => suitColor[$suit]};
    position: relative;

    &::before {
        ${({ $selected }) => $selected && cardSelected}
    }
`;

const Face = styled.div`
    width: 125px;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #F6EEE0;
    border: 0.5px solid rgba(0, 0, 0, .2);
`;

const FaceHeadline = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    line-height: 50px;
`;

const FaceHeadlineLabel = styled.h1`
    padding: 0px;
    margin: 0px;
    font-size: 55px;
    font-weight: lighter;
    letter-spacing: -7px;
`;
const FaceHeadlineSuit = styled.span`
    line-height: 50px;
    font-size: 40px;
`;
const FaceSuit = styled.div`
    margin-bottom: 10px;
    font-size : 125px;
    line-height: 100px;
    text-align: center;
`;

const Back = styled.div`
    box-sizing: border-box;
    border: 4px solid #F6EEE0;
    border-radius: 10px;
    width: 125px;
    height: 180px;
    background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100%25' width='100%25'%3E%3Cdefs%3E%3Cpattern id='doodad' width='30' height='30' viewBox='0 0 40 40' patternUnits='userSpaceOnUse' patternTransform=''%3E%3Crect width='100%25' height='100%25' fill='rgba(42, 67, 101,1)'/%3E%3Cpath d='M0 29a 9-9 0 0 0 9-9a 11-11 0 0 1 11-11v2a-9 9 0 0 0-9 9a-11 11 0 0 1-11 11zM0 69a 9-9 0 0 0 9-9a 11-11 0 0 1 11-11v2a-9 9 0 0 0-9 9a-11 11 0 0 1-11 11z' fill='rgba(26, 32, 44,1)'/%3E%3Cpath d='M20 29.5a 9.5-9.5 0 0 0 9.5-9.5a 10.5-10.5 0 0 1 10.5-10.5v1a-9.5 9.5 0 0 0-9.5 9.5a-10.5 10.5 0 0 1-10.5 10.5z' fill='rgba(236, 201, 75,1)'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23doodad)' height='200%25' width='200%25'/%3E%3C/svg%3E")
`;

export {
    Container,
    Face,
    FaceHeadline,
    FaceHeadlineLabel,
    FaceHeadlineSuit,
    FaceSuit,
    Back,
};

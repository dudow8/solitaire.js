import { styled } from 'styled-components';

const suitColor = {
    diamond: '#961316',
    heart: '#961316',
    club: '#050A30',
    spade: '#050A30',
};

const Container = styled.div`
    cursor: default;
    user-select: none;
    overflow: hidden;
    margin: 0px;
    width: 125px;
    height: 180px;
    border-radius: 10px;
    box-sizing: border-box;
    color: ${({$suit}) => suitColor[$suit]};
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
    font-family: 'Times New Roman', Times, serif;
    line-height: 50px;
`;

const FaceHeadlineLabel = styled.h1`
    padding: 0px;
    margin: 0px;
    font-size: 60px;
    font-weight: bold;
    letter-spacing: -.4px;
`;
const FaceHeadlineSuit = styled.span`
    line-height: 40px;
    font-size: 50px;
`;
const FaceSuit = styled.div`
    margin-bottom: 10px;
    font-size : 160px;
    line-height: 100px;
    text-align: center;
`;

const Back = styled.div`
    box-sizing: border-box;
    border: 4px solid #F6EEE0;
    width: 125px;
    height: 180px;
    background-color: #091994;
    background-image:
        linear-gradient(135deg, #050A30 25%, transparent 25%),
        linear-gradient(225deg, #050A30 25%, transparent 25%),
        linear-gradient(45deg, #050A30 25%, transparent 25%),
        linear-gradient(315deg, #050A30 25%, #091994 25%);
    background-position:  10px 0, 10px 0, 0 0, 0 0;
    background-size: 20px 20px;
    background-repeat: repeat;
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

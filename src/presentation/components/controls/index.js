import { newGame } from '../../../application/factory';
import styled from "styled-components";

const Content = styled.div`
    
`;

const Score = styled.div`
    color: white;
    font-size: 30px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;

const Controls = () => {
    const gameplay = useGameplayState('score');
    return (
        <Content>
            <Score>
                <span>score: {gameplay.score}</span>
                <span>moves: {gameplay.moves}</span>
            </Score>
        </Content>
    );
};

return Controls;

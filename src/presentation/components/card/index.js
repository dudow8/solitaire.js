import React from 'react';
import * as S from './styles';

const suitSymbol = {
    club: '♣',
    diamond: '♦',
    heart: '♥',
    spade: '♠',
};

const Card = ({ label, suit, flipped = false, draggable = false, ondrag = null, onDoubleClick = null }) => (
    <S.Container
        $suit={suit}
        draggable={draggable}
        onDragStart={(e) => {
            if (draggable && typeof ondrag === 'function') {
                ondrag(e);
            }
        }}
        onDoubleClick={onDoubleClick}>
        {!flipped &&
            <S.Face>
                <S.FaceHeadline>
                    <S.FaceHeadlineLabel>{label}</S.FaceHeadlineLabel>
                    <S.FaceHeadlineSuit>{suitSymbol[suit]}</S.FaceHeadlineSuit>
                </S.FaceHeadline>
                <S.FaceSuit>{suitSymbol[suit]}</S.FaceSuit>
            </S.Face>
        }
        {flipped && <S.Back />}
    </S.Container>
);

export default Card;

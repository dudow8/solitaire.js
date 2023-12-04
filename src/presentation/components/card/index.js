import React from 'react';
import * as S from './styles';

const suitSymbol = {
    club: '♣',
    diamond: '♦',
    heart: '♥',
    spade: '♠',
};

const Card = ({ label, suit, flipped = false, selected = false, draggable = false, ondrag = null, onDoubleClick = null }) => (
    <S.Container
        $suit={suit}
        $selected={selected}
        onDoubleClick={onDoubleClick}
        draggable={draggable}
        onDragStart={(e) => {
            if (draggable && typeof ondrag === 'function') {
                ondrag(e);
            }
        }}>
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

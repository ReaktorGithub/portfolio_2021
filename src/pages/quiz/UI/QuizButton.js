import React from 'react';
import styled from 'styled-components';

const StyledQuizButton = styled.button`

    outline: none;
    background: ${({color, theme}) => color === 'red' ? theme.RED.bg : theme.ORANGE.bg};
    padding: 5px 30px;
    margin-top: 25px;
    border: 2px solid ${({color, theme}) => color === 'red' ? theme.RED.bg : theme.ORANGE.bg};
    border-radius: 20px;
    cursor: pointer;
    color: #fff;
    font-weight: bold;
    box-shadow: 2px 2px 3px 0 rgba(255, 116, 2, 0.3);
    transition: .2s;


  &:hover {
    background: ${({color, theme}) => color === 'red' ? theme.RED.hover : theme.ORANGE.hover};
}
`

const QuizButton = ({text, color, onclick}) => {
    return (
        <StyledQuizButton
            color={color}
            onClick={onclick}
        >
            {text}
        </StyledQuizButton>
    )
}

export default QuizButton;
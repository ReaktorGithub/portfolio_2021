import React from 'react';
import styled from "styled-components";

const StyledTestButton = styled.button`
    min-width: 100px;
    color: white;
    outline: none;
    cursor: pointer;
    background: ${props => props.color ? props.color : 'black'};
`

const TestButton = ({text, color}) => {

    return (
        <StyledTestButton
            color={color}
        >
            {text}
        </StyledTestButton>
    );
};

export default TestButton;
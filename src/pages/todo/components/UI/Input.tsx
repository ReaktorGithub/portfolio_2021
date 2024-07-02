import React from 'react';
import styled from 'styled-components';
import {IInputProps} from "../../types";

const StyledInput = styled.input`
    width: 100%;
    max-width: 250px;
    height: 1.8rem;
    outline: none;
    
    &:focus {
        box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
    }
`

const Input: React.FC<IInputProps> = ({ placeholder, handleInput, value }) => {

    return (
        <StyledInput
            type='text'
            placeholder={placeholder}
            onChange={handleInput}
            required
            value={value}
        />
    );
};

export default React.memo(Input);
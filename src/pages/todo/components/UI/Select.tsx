import React from 'react';
import styled from 'styled-components';
import {ISelectProps, IStyledSelectProps} from "../../types";

const StyledSelect = styled.select<IStyledSelectProps>`
    width: ${props => props.width ? props.width : '100%'};
    max-width: 250px;
    height: ${props => props.height ? props.height : '1.8rem'};
`

const Select: React.FC<ISelectProps> = ({ selected, handleChange, width, height }) => {

    return (
        <StyledSelect
            onChange={handleChange}
            value={selected}
            width={width}
            height={height}
        >
            <optgroup label='Срочность'>
                <option value='none'>Не указывать</option>
                <option value='priority1'>(1) Важная срочная</option>
                <option value='priority2'>(2) Важная несрочная</option>
                <option value='priority3'>(3) Неважная срочная</option>
                <option value='priority4'>(4) Неважная несрочная</option>
            </optgroup>
        </StyledSelect>
    );
};

export default React.memo(Select);
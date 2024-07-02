import React, {useState} from 'react';
import Input from "./UI/Input";
import Button from "./UI/Button";
import Select from "./UI/Select";
import styled from 'styled-components';
import {IFormProps, Priority} from "../types";

const StyledForm = styled.form`

    margin-bottom: 30px;

    fieldset {
        display: flex;
        gap: 25px;
        border: none;
        padding: 0;
    }
    
    @media all and (max-width: 600px) {
    
        input, select {
            width: 100%;
            max-width: none;
        }
    
        fieldset {
            flex-direction: column;
        }
    }
`

const Form: React.FC<IFormProps> = ({ handleForm }) => {

    const [value, setValue] = useState<string>('');
    const [selected, setSelected] = useState<Priority>('none');

    return (
        <>
        <StyledForm
            onSubmit={(e) => {
                handleForm(e, value, selected as Priority);
                setValue('');
            }}
            data-cy='TodoForm'
        >
            <p>Задача:</p>
            <fieldset>
                <Input
                    placeholder='Введите задачу'
                    handleInput={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    value={value}
                />
                <Button
                    text='Добавить'
                    color={value === '' ? 'red' : undefined}
                />
            </fieldset>
            <p>Срочность:</p>
            <Select
                selected={selected}
                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelected(e.target.value as Priority)}
            />
        </StyledForm>
        </>
    );
};

export default Form;

/*
TODO:
пользователь может добавить строку из одних пробелов
типизировать этот компонент
 */

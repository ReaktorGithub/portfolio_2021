import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import Select from "./UI/Select";
import {TaskContext} from "../App";
import {ITaskContext, ITaskProps, Priority} from "../types";

const StyledTask = styled.div`
  display: flex;
  max-width: 500px;
  gap: 15px;
  align-items: start;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 7px;
  background: white;

  p {
    margin: 2px 0 0 0;
    flex-grow: 1;
    font-size: 14px;
    cursor: pointer;
  }

  &:hover {
    box-shadow: inset 0 0 6px 3px rgba(0,0,0,0.2);
  }
  
  .cancel {
    margin-right: 10px;
  }
  
  textarea {
    resize: none;
    min-height: 50px;
    width: 100%;
  }
`

const Task: React.FC<ITaskProps> = ({ task }) => {

    const [selected, setSelected] = useState<Priority>('none');
    const [editMode, setEditMode] = useState<boolean>(false);
    const [temp, setTemp] = useState<string>('');
    const { addDone, addCancelled, confirmEdit, confirmMove } = useContext<ITaskContext>(TaskContext);

    useEffect(() => {
        setSelected(task.priority)
    }, [task.priority])

    function handleConfirmEdit() {
        if (temp === '') return;
        setEditMode(false);
        confirmEdit(task, temp);
    }

    function handleCancelEdit() {
        setEditMode(false);
    }

    function handleEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTemp(e.target.value);
    }

    function handleOpenEdit() {
        setEditMode(true);
        setTemp(task.text);
    }

    function handleMove(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelected(e.target.value as Priority);
        confirmMove(task, e.target.value as Priority);
    }

    return (
        <StyledTask className='Task'>
            <input
                type='checkbox'
                onClick={() => addDone(task)}
            />
            {
                editMode ?
                    <div>
                        <textarea
                            onChange={ handleEdit }
                            value={ temp }
                        >
                        </textarea>
                        <button className='cancel' onClick={ handleCancelEdit }>отмена</button>
                        <button data-cy='OK' onClick={ handleConfirmEdit }>ОК</button>
                    </div>
                    : <p onClick={ handleOpenEdit }>{task.text}</p>
            }
            <Select
                width='50px'
                height='1.3rem'
                selected={selected}
                handleChange={handleMove}
            />
            <button onClick={() => addCancelled(task)}>X</button>
        </StyledTask>
    );
};

export default Task;
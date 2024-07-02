import React, {useState} from 'react';
import styled from 'styled-components';
import {IDoneListProps} from "../types";

const StyledDoneList = styled.div`
  margin-bottom: 15px;

  & > div {
    height: 1.8rem;
    cursor: pointer;
  }

  span {
    font-family: "Roboto Light", sans-serif;
    letter-spacing: 4px;
    font-size: 14px;
  }

  li {
    font-family: "Roboto Light", sans-serif;
    font-size: 14px;
    background: #d4d4d4;
    line-height: 1.5em;
  }
  
  .priority1 {
    background: #fddbdb;
  }
  .priority2 {
    background: #ffd6b7;
  }
  .priority3 {
    background: #addbff;
  }
  .priority4 {
    background: #d2ffc2;
  }
  
  .clear_btn {
    margin-left: 40px;
  }
  
  .clear_p {
    color: grey;
  }
`

const DoneList: React.FC<IDoneListProps> = ({ typeText, list, handleClear }) => {

    const [hide, setHide] = useState(true);

    return (
        <StyledDoneList data-cy='TodoDone'>
            <div onClick={() => setHide(!hide)}>
                { hide ? <span>&#9658; </span> : <span>&#9660; </span> }
                <span>{typeText}</span>
            </div>
            {
                !hide &&
                    <>
                <ul>
                    {
                        list.length ?
                        list.map(item => <li
                            key={item.id} className={item.priority}>{item.text}
                        </li>
                        ) :
                            <p className='clear_p'>пусто</p>
                    }
                </ul>
                        {
                            list.length ?
                            <button
                                className='clear_btn'
                                onClick={() => handleClear(list)}
                            >Очистить</button>
                                : null
                        }

                    </>
            }
        </StyledDoneList>
    );
};

export default React.memo(DoneList);
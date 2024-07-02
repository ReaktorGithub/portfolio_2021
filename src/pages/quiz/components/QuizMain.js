import React, {useEffect, useState} from 'react';
import QuizButton from "../UI/QuizButton";
import QuizStat from "./QuizStat";
import styled, {keyframes} from 'styled-components';

const change = keyframes`
from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
`

const StyledQuizMain = styled.div`
  display: flex;
  justify-content: space-between;
  
  input {
    display: block;
  }
  input[type=number] {
    width: 70px;
  }
  select {
    display: block;
    width: 70px;
  }

  .scoreStep {
    margin: 20px 0 30px 0;

    span {
      color: grey;
      font-weight: bold;
      display: inline-block;
    }
  }

  .anim__change {
    animation: ${change} .1s;
  }
`

function QuizMain(props) {

    const [name, setName] = useState('Игрок 1');
    const [count, setCount] = useState(5);
    const [time, setTime] = useState('step3');
    const [scoreCountBonus, setScoreCountBonus] = useState(0);
    const [scoreTimeBonus, setScoreTimeBonus] = useState(0);
    const [animChange, setAnimChange] = useState(false);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleCount = (e) => {
        const count = +e.target.value;
        if (count < 5 || count > 10) {
            return;
        }
        setCount(count);
        setScoreCountBonus(count - 5);
    }

    const handleTime = (e) => {
        setTime(e.target.value);
        switch(e.target.value) {
            case 'step1':
                setScoreTimeBonus(5);
                break;
            case 'step2':
                setScoreTimeBonus(2);
                break;
            default:
                setScoreTimeBonus(0);
        }
    }

    const handleForm = (e) => {
        e.preventDefault();
        props.updateName(name);
        props.updateTotalQuestions(count);
        let val = 15;
        if (time === 'step1') {
            val = 5;
        } else if (time === 'step2') {
            val = 10;
        }
        props.updateTimerInitial(val);
        props.setGameState('playing');
    }

    useEffect(() => {
        props.setScoreStep(scoreCountBonus + scoreTimeBonus);
        setAnimChange(true);
        setTimeout(() => {
            setAnimChange(false);
        }, 100)
    }, [scoreCountBonus, scoreTimeBonus])

    return (
        <StyledQuizMain>
            <form onSubmit={handleForm}>
                <p>Имя:</p>
                <input type='text' value={name} placeholder='введите имя' onChange={handleName} required/>
                <p>Количество вопросов (5-10):</p>
                <input type='number' value={count} onChange={handleCount}/>
                <p>Время на ответ:</p>
                <select onChange={handleTime} value={time}>
                    <option value='step1'>5 с.</option>
                    <option value='step2'>10 с.</option>
                    <option value='step3'>15 с.</option>
                </select>
                <p className='scoreStep'>Очков за правильный ответ:&nbsp;
                    <span className={animChange ? 'anim__change' : null}>{props.scoreStep}</span>
                </p>
                <QuizButton
                    text='Начать'
                />
            </form>
            {/*показывается в начале игры*/}
            <QuizStat
                recordTable={props.recordTable}
            />
        </StyledQuizMain>
    )
}

export default QuizMain;
import React, {useEffect, useState} from 'react';
import {quizList} from "../quizList";
import QuizButton from "../UI/QuizButton";
import QuizModal from "./QuizModal";
import QuizAnswer from "./QuizAnswer";
import {StylesCommon} from './stylesCommon';

const _ = require('lodash');

function QuizQuestion(props) {

    const [current, setCurrent] = useState(0);
    const [disable, setDisable] = useState(false);
    const [questionArray, setQuestionArray] = useState([0]);
    const [resultText, setResultText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [timer, setTimer] = useState(15);
    const [timerId, setTimerId] = useState();

    useEffect(() => {

        // перемешиваем вопросы
        const rand = _.range(0, props.totalQuestions);
        setQuestionArray(_.shuffle(rand));

        // таймер
        return () => clearInterval(timerId);

    }, [])

    useEffect(() => {
        if (!disable) {
            setTimer(props.timerInitial);
            const timerId = setInterval(() => {setTimer(prev => prev - 1)}, 1000);
            setTimerId(timerId);
        } else {
            clearInterval(timerId);
        }
    }, [disable])

    useEffect(() => {
        if (timer === 0) {
            clearInterval(timerId);
            setTimeout(() => {
                setResultText('не успели!');
                setDisable(true);
            }, 1000)
        }
    }, [timer])

    function handleAnswer(isCorrect) {
        setDisable(true);
        if (isCorrect) {
            props.raiseScore();
            setResultText('правильно');
        } else {
            setResultText('неправильно');
        }
    }

    function handleNext() {
        if (current >= props.totalQuestions - 1) {
            props.setGameState('over');
            return;
        }
        setCurrent(prev => prev + 1);
        setDisable(false);
    }

    return (
        <StylesCommon>
            <p className='score'>Очки: {props.score}</p>
            <p className='head'>Вопрос {current + 1}</p>
            <p className='body'>{quizList[questionArray[current]].question}</p>
            <div className='answers'>
                {
                    quizList[questionArray[current]].answers.map((item, index) => {
                        return <QuizAnswer
                            key={index}
                            disable={disable}
                            index={index}
                            item={item}
                            handleAnswer={handleAnswer}
                        />
                    })
                }
                {
                    disable && <div className='lock'/>
                }
            </div>
            <div className='resultText'>
                {
                    disable ?
                        <p>{resultText}</p>
                        : <p>таймер: <span className={timer < 5 ? 'red' : 'green'}>{timer}</span></p>
                }
            </div>
            <div className='next'>

                {
                    disable &&
                        <>
                            <QuizButton
                                onclick={() => setShowModal(true)}
                                color='red'
                                text='В меню'
                            />
                            <QuizButton
                                onclick={handleNext}
                                text='Дальше'
                            />
                        </>
                }
            </div>
            {
                showModal && <QuizModal
                        setGameState={props.setGameState}
                        setShowModal={() => setShowModal(false)}
                    />
            }
        </StylesCommon>
    )
}

export default QuizQuestion;

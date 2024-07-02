import React, {useEffect, useState} from "react";
import {StylesCommon} from './stylesCommon';

function QuizAnswer({ disable, index, item, handleAnswer }) {

    const [styleBtn, setStyleBtn] = useState(['answerBtn']);

    const handleStyle = () => {
        if (item.isCorrect) {
            setStyleBtn(prev => {
                let newStyle = [...prev];
                newStyle.push('correct');
                return newStyle;
            });
        } else {
            setStyleBtn(prev => {
                let newStyle = [...prev];
                newStyle.push('wrong');
                return newStyle;
            });
        }
    }

    useEffect(() => {
        if (!disable) {
            setStyleBtn(['answerBtn']);
        }
    }, [disable])

    let letter;
    switch (index) {
        case 0:
            letter = 'A';
            break;
        case 1:
            letter = 'B';
            break;
        case 2:
            letter = 'C';
            break;
        case 3:
            letter = 'D';
            break;
        default:
            letter = 'A';
    }

    return (
        <StylesCommon>
            <button
                className={styleBtn.join(' ')}
                disabled={disable}
                onClick={() => {
                    handleAnswer(item.isCorrect);
                    handleStyle();
                }}
            >
                {letter}: {item.answerText}
            </button>
        </StylesCommon>
    )
}

export default QuizAnswer;
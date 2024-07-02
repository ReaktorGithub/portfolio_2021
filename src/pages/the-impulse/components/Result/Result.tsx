import React, {useEffect, useRef} from 'react';
import style from './Result.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../types";
import {gameReset} from "../../redux/actionCreator";

const Result: React.FC = () => {

    const { showResult, resultContent } = useSelector((state: IRootState) => state);

    // стили
    const ref = useRef<HTMLDivElement>(null);
    const styleHead = [style.result__head];

    if (resultContent.win) {
        styleHead.push(style.win);
    } else {
        styleHead.push(style.error__animate);
    }

    useEffect(() => {
        if (ref.current) {
            if (resultContent.win) {
                ref.current.style.height = '150px';
            } else {
                ref.current.style.height = '80px';
            }
        }
    }, [showResult, resultContent])

    return (
        <div className={style.result} ref={ref}>
            <div className={style.result__bg}>
                <p className={styleHead.join(' ')}>{resultContent.headText}</p>
                <p className={style.result__body}>{resultContent.bodyText}</p>
            </div>
            {
                resultContent.win ?
                    <ResultButton/>
                    : null
            }
        </div>
    )
}

const ResultButton: React.FC = () => {

    const dispatch = useDispatch();

    return (
        <button
            className={style.result__new}
            onClick={() => dispatch(
                gameReset('again')
            )}
        >Ещё раз</button>
    )
}

export default Result;
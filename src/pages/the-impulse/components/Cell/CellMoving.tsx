import React, {useEffect, useRef} from 'react';
import style from './Cell.module.scss';
import {useSelector} from "react-redux";
import {ICellMovingProps, IRootState} from "../../types";
import {cellTransition} from "../../TheImpulse";

const CellMoving: React.FC<ICellMovingProps> = props => {

    const ref = useRef<HTMLDivElement|null>(null);
    const { posX, posY, moving, currentColor, rule, steps } = useSelector((state: IRootState) => state);

    // управление стилями

    const outerStyle1 = [style.outer1];
    const outerStyle2 = [style.outer2];
    const outerStyle3 = [style.outer3];
    const outerStyle4 = [style.outer4];
    const innerStyle = [style.inner_no_border];
    let color = style.white;

    switch (currentColor) {

        /*
        1 - желтый
        2 - зеленый
        3 - синий
        4 - красный
         */

        case 1:
            color = style.yellow;
            break;
        case 2:
            color = style.green;
            break;
        case 3:
            color = style.blue;
            break;
        case 4:
            color = style.red;
    }

    outerStyle1.push(color);
    outerStyle2.push(color);
    outerStyle3.push(color);
    outerStyle4.push(color);
    innerStyle.push(color);

    useEffect(() => {

        // при изменении позиции X
        if (ref.current) {
            ref.current.style.transitionDuration = cellTransition * steps + 'ms';
            ref.current.style.left = posX * 10 + '%';
        }
    }, [posX])

    useEffect(() => {

        // при изменении позиции Y
        if (ref.current) {
            ref.current.style.transitionDuration = cellTransition * steps + 'ms';
            ref.current.style.top = posY * 10 + '%';
        }
    }, [posY])

    useEffect(() => {

        // при начале или завершении движения
        if (ref.current) {
            if (moving) {
                ref.current.style.opacity = '1';
            } else {
                ref.current.style.opacity = '0';
            }
        }

    }, [moving])

    return (

        <div className={style.cell__moving} ref={ref}>
            {
                rule === 'outer' ?
                    <>
                    <div className={outerStyle1.join(' ')}></div>
                    <div className={outerStyle2.join(' ')}></div>
                <div className={outerStyle3.join(' ')}></div>
                <div className={outerStyle4.join(' ')}></div>
                    </>
                    : <div className={innerStyle.join(' ')}></div>
            }
        </div>
    )
}

export default CellMoving;

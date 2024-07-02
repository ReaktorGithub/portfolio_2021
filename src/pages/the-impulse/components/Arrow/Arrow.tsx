import React, {useEffect, useRef} from 'react';
import style from './Arrow.module.scss';
import arrowImg from './img/arrow.png';
import {useSelector} from "react-redux";
import {IArrowProps, IRootState} from "../../types";

const Arrow: React.FC<IArrowProps> = props => {

    const arrowRef = useRef<HTMLImageElement|null>(null);

    const { arrowRotateIndex, arrowPosX, arrowPosY, arrowShow } = useSelector((state: IRootState) => state);

    useEffect(() => {

        // при изменении rotateIndex
        setRotate(props.rotateArray[arrowRotateIndex]);
    }, [arrowRotateIndex, arrowShow])

    useEffect(() => {

        //console.log('rotateIndex = ', arrowRotateIndex);
    }, [arrowRotateIndex])

    useEffect(() => {

        // при изменении позиции X
        if (arrowRef.current) {
            arrowRef.current.style.left = arrowPosX * 10 + '%';
        }
    }, [arrowPosX, arrowShow])

    useEffect(() => {

        // при изменении позиции Y
        if (arrowRef.current) {
            arrowRef.current.style.top = arrowPosY * 10 + '%';
        }
    }, [arrowPosY, arrowShow])

    const setRotate = (deg: number) => {

        // вращать
        if (arrowRef.current) {
            arrowRef.current.style.transform = 'rotate(' + deg + 'deg)';
        }
    }

    return (
        <>
        {
            arrowShow ?
                <img
                    className={style.arrow}
                    alt='стрелка'
                    src={arrowImg}
                    ref={arrowRef}
                />
                : null
        }
        </>
    )
}

export default Arrow;
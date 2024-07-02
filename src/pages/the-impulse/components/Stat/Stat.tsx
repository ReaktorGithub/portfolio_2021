import React from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../types";

const Stat: React.FC = () => {

    const { wins, loses } = useSelector((state : IRootState) => state)

    return (
        <>
            <p><b>Статистика:</b></p>
            <p>Ошибки - {loses}</p>
            <p>Победы - {wins}</p>
        </>
    )
}

export default Stat;
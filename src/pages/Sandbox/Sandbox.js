import React from 'react';
import style from './Sandbox.module.scss';

const Sandbox = ({ name, list, showOther }) => {

    return (
        <div className={style.container}>
            <h2>{name}</h2>
            {
                list.map((item, index) => {
                    return <p key={index}>{item}</p>
                })
            }
            { showOther &&
                <p className={style.other}>Другие возможности - см. консоль</p>
            }
        </div>
    );
};

export default Sandbox;
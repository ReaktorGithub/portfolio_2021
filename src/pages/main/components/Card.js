import React from 'react';
import style from './Card.module.css';
import { Link } from "react-router-dom";

function Card(props) {

    return (
        <div className={style.card}>
            <h2>{props.name}</h2>
            <p>{props.desc}</p>
            <p><b>Демонстрирует технологии:</b></p>
            <p>{props.tech}</p>
            <Link to={props.link}>
                <button className={style.card__btn}>старт</button>
            </Link>
        </div>
    )
}

export default Card;
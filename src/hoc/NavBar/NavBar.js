import React, {useRef, useState} from 'react';
import style from './NavBar.module.scss';
import { NavLink } from 'react-router-dom';
import {pagesList} from "../../pagesList";

function NavBar({ children }) {

    const barRef = useRef(null);
    const [barIsOpen, setBarIsOpen] = useState(false);

    const barHandler = () => {

        if (barIsOpen) {
            if (barRef.current) {
                barRef.current.style.width = '0';
                barRef.current.style.height = '0';
                barRef.current.style.marginLeft = '-100px';
            }
        } else {
            if (barRef.current) {
                barRef.current.style.width = '300px';
                barRef.current.style.height = '600px';
                barRef.current.style.marginLeft = '0';
            }
        }
        setBarIsOpen(!barIsOpen);
    }

    return (
        <aside className={style.NavBar} data-cy='NavBar'>
            <div className={style.nav__burger} onClick={barHandler}>
                <div/>
                <div/>
                <div/>
            </div>
            <div className={style.nav__table} ref={barRef}>
                {
                    barIsOpen ?
                        <div className={style.content}>
                            <p className={style.logo}>portfolio</p>
                            <nav>
                                <NavLink exact to='/' activeClassName={style.active}>На главную</NavLink>
                                <hr/>
                                {
                                    pagesList.map(item => <NavLink
                                        key={item.id}
                                        to={item.link}
                                        activeClassName={style.active}
                                    >
                                        {item.name}
                                    </NavLink>)
                                }
                            </nav>
                        </div>
                        : null
                }
            </div>
            {
                barIsOpen ?
                    <div className={style.bg} onClick={barHandler}/>
                    : null
            }

            {children}
        </aside>
    )
}

export default NavBar;
import React from 'react';
import {useSelector} from "react-redux";

const style = {
    height: '1.7em',
    padding: '0 20px',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '1em',
}

const Button = ({ text, actionBtn }) => {

    const { disable } = useSelector(state => state.main);

    return (
        <button
            onClick={actionBtn}
            disabled={disable}
            style={style}
        >
            { text }
        </button>
    );
};

export default Button;
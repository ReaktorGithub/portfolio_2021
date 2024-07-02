import React from 'react';
import style from './Item.module.scss';

const Item = ({ type, content, actionDelete, actionAdd }) => {
    return (
        <div className={style.Item}>
            <div className={style.content}>
                <div>
                    <h3>{content.id}: {content.title}</h3>
                    <p>{content.body}</p>
                </div>
                {
                    type === 'saved' ?
                        <button
                            className={style.red}
                            onClick={actionDelete}
                        >X</button>
                        : <button
                            className={style.yellow}
                            onClick={actionAdd}
                        >+</button>
                }

            </div>
        </div>
    );
};

export default Item;
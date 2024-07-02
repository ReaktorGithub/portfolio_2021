import React from 'react';
import style from './JsonPlaceholder.module.scss';
import Item from "./Item";
import Button from "./Button";
import {useDispatch, useSelector} from "react-redux";
import {
    addItemToSaved,
    clearReceived,
    clearSaved,
    disableButtons,
    enableButtons,
    refreshReceived, removeItemFromSaved
} from "../jsonReducer";
import {Transition} from "react-transition-group";

const JsonPlaceholder = () => {

    const { savedList, receivedList } = useSelector(state => state.main);
    const dispatch = useDispatch();

    const getJson = () => {
        dispatch(disableButtons());
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => dispatch(refreshReceived(data)))
            .finally(setTimeout(() => {
                        dispatch(enableButtons())
                    }, 500 ));
    }

    return (
        <div className={style.Json}>
            <h1>JSON Placeholder</h1>
            <div className={style.table}>

                <div>
                    <h2>Сохранённый список</h2>
                    <div className={style.buttons}>
                        {
                            savedList.length ?
                                <Button
                                    text='очистить'
                                    actionBtn={() => dispatch(clearSaved())}
                                />
                                : null
                        }
                    </div>
                    {
                        savedList.map(item => <Item
                            type='saved'
                            content={item}
                            key={item.id}
                            actionDelete={() => {
                                console.log('удалено', item.id);
                                dispatch(removeItemFromSaved(item.id));
                            }}
                        />)
                    }
                </div>

                <div>
                    <h2>Список из JSONPlaceholder</h2>
                    <div className={style.buttons}>
                        <Button
                            text={receivedList.length ? 'загрузить снова' : 'загрузить'}
                            actionBtn={() => getJson()}
                        />
                        {
                            receivedList.length ?
                                <Transition in={!!receivedList.length} timeout={500}>
                                    {
                                        state => <Button
                                            text={ 'очистить ' + state}
                                            actionBtn={() => dispatch(clearReceived())}
                                        />
                                    }
                                </Transition>
                                : null
                        }
                    </div>
                    {
                        receivedList.map(item => <Item
                            type='received'
                            content={item}
                            key={item.id}
                            actionAdd={() => dispatch(addItemToSaved(item))}
                        />)
                    }
                </div>

            </div>
        </div>

    );
};

export default JsonPlaceholder;
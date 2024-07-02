import {
    GAME_RESET,
    SET_ARROW_POS,
    SET_ARROW_ROTATE_INDEX,
    SET_ARROW_SHOW, SET_CURRENT_COLOR,
    SET_DISABLE_CONTROLS,
    SET_MOVING, SET_POS, SET_STEPS, SHOW_RESULT,
    SWITCH_RULE
} from "./actionCreator";

import {IRootState, TypeResult} from "../types";

import {posXDefault} from '../TheImpulse';
import {posYDefault} from '../TheImpulse';

const initialState: IRootState = {

    arrowRotateIndex: 0, // индекс для массива с вариантами углов стрелки
    arrowPosX: posXDefault, // позиция стрелки по X (column, 0-9)
    arrowPosY: posYDefault, // позиция стрелки по Y (row, 0-9)
    arrowShow: true, // показать стрелку
    disableControls: false, // отключить элементы управления
    rule: 'inner', // текущее правило: внутренний квадрат или внешний
    moving: false, // совершается движение в данный момент
    posX: posXDefault, // позиция движущегося квадрата по X (column, 0-9)
    posY: posYDefault, // позиция движущегося квадрата по Y (column, 0-9)
    currentColor: 0, // текущий цвет (тот, что мерцает)
    steps: 0, // на сколько шагов произошёл ход (нужно для изменения css transition)
    showResult: false, // показать результат
    resultContent: {
        headText: 'ОШИБКА',
        bodyText: 'неправильный цвет',
        win: false, // характер результата - нужен для изменений высоты дива и дальнейшего действия
    },
    wins: 0, // число побед
    loses: 0, // число ошибок
}

export default function rootReducer(state = initialState, action: any): IRootState {

    switch (action.type) {

        case SET_ARROW_ROTATE_INDEX: {
            return {
                ...state,
                arrowRotateIndex: action.payload,
            }
        }

        case SET_ARROW_POS: {

            const x = action.payload.x !== undefined ? action.payload.x : state.arrowPosX;
            const y = action.payload.y !== undefined ? action.payload.y : state.arrowPosY;

            return {
                ...state,
                arrowPosX: x,
                arrowPosY: y,
            }
        }

        case SET_POS: {

            const x = action.payload.x !== undefined ? action.payload.x : state.posX;
            const y = action.payload.y !== undefined ? action.payload.y : state.posY;

            return {
                ...state,
                posX: x,
                posY: y,
            }
        }

        case SET_DISABLE_CONTROLS: {
            return {
                ...state,
                disableControls: action.payload,
            }
        }

        case SET_STEPS: {
            return {
                ...state,
                steps: action.payload,
            }
        }

        case SET_ARROW_SHOW: {
            return {
                ...state,
                arrowShow: action.payload,
            }
        }

        case SWITCH_RULE: {

            let newState: 'inner' | 'outer';
            if (state.rule === 'inner') {
                newState = 'outer';
            } else {
                newState = 'inner';
            }

            return {
                ...state,
                rule: newState,
            }
        }

        case SET_MOVING: {
            return {
                ...state,
                moving: action.payload,
            }
        }

        case SET_CURRENT_COLOR: {
            return {
                ...state,
                currentColor: action.payload,
            }
        }

        case SHOW_RESULT: {

            //console.log('РЕЗУЛЬТАТ: ', action.payload);

            const type: TypeResult = action.payload;
            let head = '';
            let body = '';
            let win = false;
            let winsCount = state.wins;

            switch (type) {
                case 'wall': {
                    head = 'ОШИБКА';
                    body = 'удар об стену';
                    break;
                }
                case 'wrongColor': {
                    head = 'ОШИБКА';
                    body = 'неправильный цвет';
                    break;
                }
                case 'start': {
                    head = 'ОШИБКА';
                    body = 'вернулся в начало!';
                    break;
                }
                case 'win': {
                    head = 'ПОБЕДА!';
                    body = 'Спасибо за игру';
                    win = true;
                    winsCount++;
                }
            }

            return {
                ...state,
                showResult: true,
                resultContent: {
                    headText: head,
                    bodyText: body,
                    win: win,
                },
                wins: winsCount,
            }
        }

        case GAME_RESET: {

            let loses = state.loses;
            let showResult = false;

            if (action.payload === 'win') {
                showResult = true;
            } else if (action.payload === 'again') {
                showResult = false;
            } else {
                loses++;
            }

            return {
                ...state,
                arrowRotateIndex: 0,
                arrowPosX: posXDefault,
                arrowPosY: posYDefault,
                arrowShow: true,
                disableControls: false,
                rule: 'inner',
                moving: false,
                posX: posXDefault,
                posY: posYDefault,
                showResult: showResult,
                loses: loses,
            }
        }

        default:
            return state;
    }
}
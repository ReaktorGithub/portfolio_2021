import {TypeSetNumber, TypeSetBoolean, ISwitchRule, TypeCords, TypeResult, IShowResult, IGameReset} from "../types";

import {cellTransition} from '../TheImpulse';

export const SET_ARROW_ROTATE_INDEX = 'SET_ARROW_ROTATE_INDEX';
export const SET_ARROW_POS = 'SET_ARROW_POS';
export const SET_DISABLE_CONTROLS = 'SET_DISABLE_CONTROLS';
export const SET_ARROW_SHOW = 'SET_ARROW_SHOW';
export const SWITCH_RULE = 'SWITCH_RULE';
export const SET_MOVING = 'SET_MOVING';
export const SET_POS = 'SET_POS';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';
export const SET_STEPS = 'SET_STEPS';
export const SHOW_RESULT = 'SHOW_RESULT';
export const GAME_RESET = 'GAME_RESET';

export function setArrowRotateIndex(index: number): TypeSetNumber {
    return {
        type: SET_ARROW_ROTATE_INDEX,
        payload: index,
    }
}

export function setArrowPos(x?: number, y?: number): TypeCords {
    return {
        type: SET_ARROW_POS,
        payload: {
            x: x,
            y: y,
        },
    }
}

export function setPos(x?: number, y?: number): TypeCords {
    return {
        type: SET_POS,
        payload: {
            x: x,
            y: y,
        },
    }
}

export function setCurrentColor(num: number): TypeSetNumber {
    return {
        type: SET_CURRENT_COLOR,
        payload: num,
    }
}

export function setSteps(num: number): TypeSetNumber {
    return {
        type: SET_STEPS,
        payload: num,
    }
}

export function setDisableControls(value: boolean): TypeSetBoolean {
    return {
        type: SET_DISABLE_CONTROLS,
        payload: value,
    }
}

export function setArrowShow(value: boolean): TypeSetBoolean {
    return {
        type: SET_ARROW_SHOW,
        payload: value,
    }
}

export function switchRule(): ISwitchRule {
    return {
        type: SWITCH_RULE,
    }
}

export function setMoving(value: boolean): TypeSetBoolean {
    return {
        type: SET_MOVING,
        payload: value,
    }
}

export function setResult(type: TypeResult, steps: number) {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(
                showResult(type)
            );
        }, cellTransition * steps)

        if (type !== 'win') {
            setTimeout(() => {
                dispatch(
                    gameReset(type)
                );
            }, 3000)
        }
    }
}

export function showResult(type: TypeResult): IShowResult {
    return {
        type: SHOW_RESULT,
        payload: type,
    }
}

export function gameReset(win: TypeResult | 'again'): IGameReset {
    return {
        type: GAME_RESET,
        payload: win,
    }
}
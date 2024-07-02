import React, {Component} from "react";
import style from './TheImpulse.module.scss';
import Stat from "./components/Stat/Stat";
import Cell from "./components/Cell/Cell";
import Arrow from "./components/Arrow/Arrow";
import {connect} from 'react-redux';
import {
    setResult,
    setArrowPos,
    setArrowRotateIndex,
    setArrowShow, setCurrentColor,
    setDisableControls,
    setMoving, setPos, switchRule, setSteps,
} from "./redux/actionCreator";
import {IRootState, TypeResult, TypeRule} from "./types";
import CellMoving from "./components/Cell/CellMoving";
import Result from "./components/Result/Result";

const map01 = [
    [23, 0, 0, 0, 0, 0, 0, 21, 0, 0],
    [0, 63, 12, 0, 0, 0, 0, 14, 0, 0],
    [0, 0, 0, 21, 0, 11, 0, 0, 0, 31],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 31, 14, 24, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 41, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 34, 0, 0, 0, 0, 0],
    [0, 54, 0, 0, 0, 0, 0, 34, 0, 0],
    [43, 0, 0, 0, 0, 0, 0, 0, 0, 41],
];

const rotateArray: number[] = [0,315,270,225,180,135,90,45]; // углы вращения стрелки
const arrowRotateIndexDefault = 0;
export const posXDefault = 1; // координаты по умолчанию
export const posYDefault = 8;
export const cellTransition = 200; // css transition для движущейся клетки, ms

class TheImpulse extends Component<any> {

    componentDidMount() {
        document.addEventListener('keydown', this.keyBinder.bind(this))
        this.props.setArrowRotateIndex(arrowRotateIndexDefault);
        this.props.setArrowPos(posXDefault, posYDefault);
        this.props.setPos(posXDefault, posYDefault);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyBinder.bind(this));
    }

    keyBinder(e: any) {

        // назначения клавиш
        if (e.key === 'Enter' || e.key === ' ') {
            this.play();
        }
        if (e.key === 'a') {
            this.rotateLeft();
        }
        if (e.key === 'd') {
            this.rotateRight();
        }
    }

    rotateLeft() {

        if (this.props.arrowRotateIndex === rotateArray.length - 1) {
            this.props.setArrowRotateIndex(0);
        } else {
            this.props.setArrowRotateIndex(this.props.arrowRotateIndex + 1);
        }
    }

    rotateRight() {

        if (this.props.arrowRotateIndex === 0) {
            this.props.setArrowRotateIndex(rotateArray.length - 1);
        } else {
            this.props.setArrowRotateIndex(this.props.arrowRotateIndex - 1);
        }
    }

    play() {

        let newColor: number = this.getColor(this.props.arrowPosX, this.props.arrowPosY);

        this.props.setDisableControls(true);
        this.props.setArrowShow(false);
        this.props.setMoving(true);
        this.props.setCurrentColor(newColor);
        this.makeMove(newColor);
    }

    makeMove (newColor: number) {

        // Узнать новую позицию

        let x = this.props.posX;
        let y = this.props.posY;
        let steps = 0;

        do {
            steps++;
            switch (this.props.arrowRotateIndex) {
                case 0: {
                    x++;
                    break;
                }
                case 1: {
                    x++;
                    y--;
                    break;
                }
                case 2: {
                    y--;
                    break;
                }
                case 3: {
                    x--;
                    y--;
                    break;
                }
                case 4: {
                    x--;
                    break;
                }
                case 5: {
                    x--;
                    y++;
                    break;
                }
                case 6: {
                    y++;
                    break;
                }
                case 7: {
                    x++;
                    y++;
                    break;
                }
            }

            // если на новой позиции пустая клетка и не стена, то цикл повторится
        } while (!(x < 0 || x > 9 || y < 0 || y > 9) && map01[y][x] === 0)

        this.props.setSteps(steps);

        /*
        Пока квадрат едет, определить, что его ожидает на предсказанной координате
        Варианты:
        - стена - промах
        - другой квадрат
         */

        if (x < 0 || x > 9 || y < 0 || y > 9) {

            // врезался в стену

            if (x < 0) x += 0.5;
            if (x > 9) x -= 0.5;
            if (y < 0) y += 0.5;
            if (y > 9) y -= 0.5;

            this.props.setResult('wall', steps); // async
            this.props.setPos(x, y);

            return;
        }

        this.props.setPos(x, y);

        /*
         Предсказан другой квадрат.
         Сопоставить цвета.

         Цвета совпадают:
        - узнать тип клетки
        - старт: промах, финиш: выиграл, обычная: правильный ход
        Цвета не совпадают:
        - промах
         */

        let goalCell = map01[y][x];
        let color = {
            inner: goalCell % 10,
            outer: Math.floor(goalCell / 10),
        }
        // @ts-ignore
        if (newColor === color[this.props.rule]) {

            //console.log('цвета совпали');

            let testNew: TypeRule;
            if (this.props.rule === 'inner') {
                testNew = 'outer';
            } else {
                testNew = 'inner';
            }

            if (color[testNew] === 5) {

                // врезался в старт
                this.props.setResult('start', steps); // async

            } else if (color[testNew] === 6) {

                // финишировал
                this.props.setResult('win', steps); // async

            } else {

                // правильный ход
                //console.log('правильный ход');
                setTimeout(() => {
                    this.moveIsOver(x, y);
                }, cellTransition * steps)
            }

            return;
        }

        // неверный цвет
        this.props.setResult('wrongColor', steps); // async
    }

    /**
     * ход закончен, теперь ходим из нового квадрата
     */

    moveIsOver (newX: number, newY: number) {

        this.props.setMoving(false);
        this.props.switchRule();
        this.props.setArrowShow(true);
        this.props.setArrowPos(newX, newY);
        this.props.setDisableControls(false);
    }

    getColor (x: number, y: number): number {

        // вернуть цвет

        let color = map01[y][x];
        if (this.props.rule === 'inner') {
            color = color % 10;
        } else {
            color = Math.floor(color / 10);
        }

        //console.log('определен цвет: ', color)
        return color;
    }

    render() {
        return (
            <div className={style.TheImpulse}>

                <header>
                    <h1>The Impulse Demo</h1>
                </header>

                <main className={style.main}>

                    <div className={style.sidebar}>
                        <p><b>Цель игры:</b><br/>добраться до квадрата со знаком "К"</p>
                        <div className={style.howTo}>
                            <p><b>Управление:</b></p>
                            <p>"A" - вращать стрелку влево</p>
                            <p>"D" - вращать стрелку вправо</p>
                            <p>"пробел / Enter" - пуск</p><br/>
                        </div>

                        <Stat/>
                    </div>

                    <div className={style.game}>
                        <div className={style.field}>

                            {
                                map01.map((item, colIndex) => {
                                    return item.map((val, rowIndex) => {

                                        return <Cell
                                            key={'' + colIndex + rowIndex}
                                            cords={'' + colIndex + rowIndex}
                                            type={val}
                                        />
                                    })
                                })
                            }

                            <Arrow
                                rotateArray={rotateArray}
                            />

                            <CellMoving
                                matrix={map01}
                            />
                            {
                                this.props.showResult ?
                                    <Result/>
                                    : null
                            }
                        </div>
                        <div className={style.controls}>
                            <button
                                className={style.btnTurnLeft}
                                onClick={this.rotateLeft.bind(this)}
                                disabled={this.props.disableControls}
                            >&#9668;</button>
                            <button
                                className={style.btnTurnRight}
                                onClick={this.rotateRight.bind(this)}
                                disabled={this.props.disableControls}
                            >&#9658;</button>
                            <button
                                className={style.btnPlay}
                                onClick={this.play.bind(this)}
                                disabled={this.props.disableControls}
                            ><b>ПУСК</b>
                            </button>
                        </div>
                    </div>
                </main>

                <footer className={style.footer}>
                    <p>Данная игра сделана для демонстрации базовой механики, а также скилла автора в React, Redux и TypeScript.<br/>
                        Чтобы скачать концепт игры, переходите по <a
                            href="https://disk.yandex.ru/i/em8Gm7TdZs5R-w">ссылке</a><br/>Reaktor, 2021</p>
                </footer>

            </div>
        );
    }
}

function mapStateToProps(state: IRootState) {
    return {
        arrowRotateIndex: state.arrowRotateIndex,
        disableControls: state.disableControls,
        arrowPosX: state.arrowPosX,
        arrowPosY: state.arrowPosY,
        rule: state.rule,
        posX: state.posX,
        posY: state.posY,
        showResult: state.showResult,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        setArrowRotateIndex: (index: number) => dispatch(setArrowRotateIndex(index)),
        setArrowPos: (x: number, y: number) => dispatch(setArrowPos(x, y)),
        setPos: (x: number, y: number) => dispatch(setPos(x, y)),
        setDisableControls: (val: boolean) => dispatch(setDisableControls(val)),
        setArrowShow: (val: boolean) => dispatch(setArrowShow(val)),
        setMoving: (val: boolean) => dispatch(setMoving(val)),
        setCurrentColor: (color: number) => dispatch(setCurrentColor(color)),
        setResult: (type: TypeResult, steps: number) => dispatch(setResult(type, steps)),
        setSteps: (steps: number) => dispatch(setSteps(steps)),
        switchRule: () => dispatch(switchRule()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheImpulse);

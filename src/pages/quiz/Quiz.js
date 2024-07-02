import React, {Component} from 'react';
import QuizQuestion from "./components/QuizQuestion";
import QuizMain from "./components/QuizMain";
import QuizStat from "./components/QuizStat";
import QuizButton from "./UI/QuizButton";
import styled, {ThemeProvider} from 'styled-components';

const _ = require('lodash');

const buttonThemes = {
    ORANGE: {
        bg: '#ffb700',
        hover: '#ff8001',
    },
    RED: {
        bg: '#ff6363',
        hover: '#db0909',
    }
}

const StyledQuiz = styled.div`
  background: #bae19f;
  height: 100vh;
  width: 100vw;
  padding-top: 20px;

  p, td {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
  }

  th {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: bold;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    font-family: 'Josefin Sans', serif;
    text-align: center;
    margin-bottom: 25px;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
  }

  .cont {
    width: 80%;
    min-width: 600px;
    max-width: 850px;
    padding: 20px 35px;
    margin: 0 auto;
    border-radius: 6px;
    background: #fff;
    border: 2px solid #408b40;
  }

  .over {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`


class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Игрок 1',
            timerInitial: 15,
            totalQuestions: 5,
            gameState: 'menu', // menu, playing, over
            recordTable: [],
            score: 0,
            scoreStep: 10,
        }
    }

    updateName(val) {
        this.setState({name: val})
    }

    updateTimerInitial(val) {
        this.setState({timerInitial: val})
    }

    updateTotalQuestions(val) {
        this.setState({totalQuestions: val})
    }

    setGameState(newState) {
        this.setState({gameState: newState})
        if (newState === 'menu') {
            this.setState({
                score: 0
            })
        }
    }

    componentDidMount() {
        let save = localStorage.getItem('quiz');
        if (save) {
            save = _.orderBy(JSON.parse(save), ['score'], ['desc']);
            this.setState({
                recordTable: save
            })
        } else {
            console.log('нет записей о рекордах');
        }
    }

    addRowToRecordTable(row) {
        let tableCopy = [...this.state.recordTable];
        tableCopy.push(row);
        tableCopy = _.orderBy(tableCopy, ['score'], ['desc']);
        this.setState({
            recordTable: tableCopy
        })
        localStorage.setItem('quiz', JSON.stringify(tableCopy));
    }

    raiseScore() {
        this.setState({
            score: this.state.score + this.state.scoreStep
        })
    }

    setScoreStep(add) {
        this.setState({
            scoreStep: 10 + add
        })
    }

    render() {
        return (
            <StyledQuiz>
                <h1>Викторина</h1>
                <ThemeProvider theme={buttonThemes}>
                    <div className='cont'>
                        {
                            this.state.gameState === 'playing' ?
                                <QuizQuestion
                                    timerInitial={this.state.timerInitial}
                                    totalQuestions={this.state.totalQuestions}
                                    setGameState={this.setGameState.bind(this)}
                                    score={this.state.score}
                                    raiseScore={this.raiseScore.bind(this)}
                                />
                                : this.state.gameState === 'menu' ?
                                    <QuizMain
                                        updateName={this.updateName.bind(this)}
                                        updateTimerInitial={this.updateTimerInitial.bind(this)}
                                        updateTotalQuestions={this.updateTotalQuestions.bind(this)}
                                        setGameState={this.setGameState.bind(this)}
                                        recordTable={this.state.recordTable}
                                        addRowToRecordTable={(row) => this.addRowToRecordTable(row)}
                                        scoreStep={this.state.scoreStep}
                                        setScoreStep={this.setScoreStep.bind(this)}
                                    />
                                : <div className='over'>
                                        {/*показывается в конце игры*/}
                                        <QuizStat
                                            gameState={this.state.gameState}
                                            recordTable={this.state.recordTable}
                                            addRowToRecordTable={(row) => this.addRowToRecordTable(row)}
                                            name={this.state.name}
                                            score={this.state.score}
                                            width='auto'
                                        />
                                        <QuizButton
                                            onclick={() => this.setGameState('menu')}
                                            text='В меню'
                                            color='red'
                                        />
                                    </div>
                        }
                    </div>
                </ThemeProvider>
            </StyledQuiz>
        )
    }
}

export default Quiz;


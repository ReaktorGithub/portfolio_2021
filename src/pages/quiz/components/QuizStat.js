import React, {useEffect} from 'react';
import styled from 'styled-components';

const StyledQuizStat = styled.div`
    width: ${props => props.width || '42%'};

    table td, table th {
    padding: 3px 7px;
    text-align: left;
    font-size: .8em;
  }

  table thead {
    background: #ffb700;
  }

  table tbody {
    background: #ffedbf;
  }

  table thead tr th:nth-child(2) {
    min-width: 120px;
  }

  .empty {
    text-align: center;
    color: grey;
  }
`

function QuizStat(props) {

    useEffect(() => {
        if (props.gameState) {

            // код запускается в конце игры
            const row = {
                name: props.name,
                score: props.score,
            }

            console.log('игра окончена! ', row);
            props.addRowToRecordTable(row);
        }
    }, [props.gameState])

    return (
        <StyledQuizStat width={props.width}>
                <h2>Таблица рекордов</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Место</th>
                        <th>Имя</th>
                        <th>Очки</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.recordTable.length === 0 ?
                            <tr>
                                <td className='empty' colSpan='3'>ПУСТО</td>
                            </tr>
                            :
                            props.recordTable.map((item, index) => {
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.score}</td>
                                </tr>
                            })
                    }
                    </tbody>

                </table>
        </StyledQuizStat>
    )
}

export default QuizStat;

import styled from "styled-components";

// используется для компонентов QuizAnswer и QuizQuestion

export const StylesCommon = styled.div`
    .head {
    font-weight: bold;
    font-size: 18px;
  }

  .body {
    height: 40px;
  }

  .answerBtn {
    background: #ecf9ff;
    width: 100%;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
    margin-bottom: 15px;
    transition: .2s;
    outline: none;
    color: #4b4b4b;
    font-size: 15px;
    text-align: left;

    &:hover {
      border: 2px solid #bbe0ff;
    }
  }

  .wrong {
    background: #ff6363;
    border: 2px solid #ff0000;
  }

  .correct {
    background: #a9ff63;
    border: 2px solid #72ff00;
  }

  .next {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .score {
    text-align: right;
    font-size: 13px;
    color: gray;
    margin: 0;
  }

  .resultText {
    height: 1em;
    margin: 15px 0 0 0;

    p {
      text-align: center;
      text-transform: uppercase;
      font-size: 1em;
    }

    .red {
      color: red;
    }

    .green {
      color: green;
    }

    span {
      font-weight: bold;
    }
  }

  .answers {
    position: relative;

    .lock {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
    }
  }
`
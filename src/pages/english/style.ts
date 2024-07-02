import { BG, BG_CONT, CONT_PADDING, DICT_BODY, DICT_BTN_DELETE, DICT_HEAD, ERROR_COLOR } from './constants';
import styled, { css } from 'styled-components';

interface IEnglishTrainingProps {
  error: boolean;
}

const errorFragment = css`
  color: ${ERROR_COLOR};
  font-size: 0.8em;
  margin: 0;
`

export const WrappedLayout = styled.div`
  width: 100%;
  height: 100vh;
  background: ${BG};

  p, span {
    font-family: 'Gill Sans', sans-serif;
    font-size: 15px;
  }

  h2 {
    text-align: center;
  }

  h3 {
    margin-top: 2em;
    text-align: center;
  }

  .cont {
    margin: 0 auto;
    width: 60%;
    min-width: 446px;
    height: 100%;
    padding: ${CONT_PADDING};
    background: ${BG_CONT};
    position: relative;

    footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: ${BG_CONT};
    padding-right: ${CONT_PADDING};

      a {
        color: #7dc9f7;
        font-size: 0.9em;
        text-align: right;
        display: block;
      }
    }
  }
`

export const WrappedEnglishTraining = styled.div<IEnglishTrainingProps>`
  .word-for-training {
    margin-right: 15px;
  }

  .word-selected {
    color: #b78334;
    font-weight: bold;
    margin-right: 15px;
  }

  .btn-start {
    display: block;
    margin-top: 20px;
  }

  .btn-check {
    width: 80px;
  }

  .task {
    color: red;
  }

  .input-form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;

    input {
      min-width: 250px;
    }

    .input-error {
      ${errorFragment};
      visibility: ${props => props.error ? 'visible' : 'hidden'};
    }
  }

  .result {
    font-style: italic;
    margin: 0;

    &--true {
      color: green;
      font-weight: bold;
    }

    &--false {
      color: red;
      font-weight: bold;
    }

    &--right {
      font-weight: bold;
    }
  }

  .count {
    font-weight: 100;
  }

  .show-answer {
    height: 40px;
  }

  .btn-hint {
    display: block;
    margin: 20px 0;
  }

  .img-hint img {
    width: 100%;
  }
`

export const WrappedDictionaryEditor = styled.div<IEnglishTrainingProps>`
  form {
    display: flex;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;

    label {
      width: 200px;
      font-family: sans-serif;
      font-size: 0.8em;
    }

    select {
      margin-left: 10px;
      width: 60px;
    }

    .error {
      ${errorFragment};
      visibility: ${props => props.error ? 'visible' : 'hidden'};
    }
  }

  .scroll {
    width: 100%;
    background: white;
    overflow-y: scroll;

    .dictionary {
      width: 100%;

      thead {
        background: ${DICT_HEAD};
        height: 2em;
      }

      tbody {
        background: ${DICT_BODY};
        text-align: left;

        tr {
          td {
            padding-left: 20px;
            font-family: sans-serif;
            font-size: 0.8em;
          }

          td:last-child {
            padding: 0;
          }

          td:nth-child(4) {
            padding: 0;
            color: grey;
            text-align: center;
          }

          .btn-delete {
            background: ${DICT_BTN_DELETE};
            border: none;
            width: 100%;
            height: 100%;
            cursor: pointer;

            &:hover {
              color: white;
              background: red;
            }
          }
        }
      }
    }
  }
`

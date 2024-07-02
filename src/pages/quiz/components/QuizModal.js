import React from 'react';
import QuizButton from "../UI/QuizButton";
import Modal from "../../../hoc/Modal/Modal";
import styled from 'styled-components';

const StyledQuizModal = styled.div`
  height: 26%;
  background: #fff;
  border: 2px solid green;
  padding: 45px 115px;

  .modal__btns {
    display: flex;
    justify-content: space-between;
  }

  p {
    text-align: center;
    margin-bottom: 20px;
  }
`

function QuizModal(props) {
    return (
        <Modal>
            <div className='modal__bg'>
                <StyledQuizModal>
                    <p>Вы действительно хотите прервать викторину?</p>
                        <div className='modal__btns'>
                            <QuizButton
                                color='red'
                                onclick={() => props.setGameState('menu')}
                                text='Да'
                            />
                            <QuizButton
                                onclick={() => props.setShowModal()}
                                text='Отмена'
                            />
                        </div>
                </StyledQuizModal>
            </div>
        </Modal>
    )
}

export default QuizModal;
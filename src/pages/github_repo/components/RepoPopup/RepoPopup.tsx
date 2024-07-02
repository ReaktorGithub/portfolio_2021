import React from "react";
import Modal from "../../../../hoc/Modal/Modal";
import style from '../RepoList/repoList.module.css'

function RepoPopup(props: any) {

    return (
        <Modal>
            <div className='modal__bg'>
                <div className={style.modal__cont}>
                    <table className={style.modal__table}>
                        <tbody>
                        <tr>
                            <td>Пользователь:</td>
                            <td>{props.currentRepo.owner.login}</td>
                        </tr>
                        <tr>
                            <td>Название репозитория:</td>
                            <td>{props.currentRepo.name}</td>
                        </tr>
                        <tr>
                            <td>Создан:</td>
                            <td>{props.currentRepo.created_at}<br/>{props.currentRepo.created_ago}</td>
                        </tr>
                        <tr>
                            <td>Размер:</td>
                            <td>{props.currentRepo.size} кб</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>Скачать ZIP-архив данного репозитория?</p>
                    <div className={style.modal__btnCont}>
                        <button onClick={props.downloadCancel}>
                            отмена
                        </button>
                        <button>
                            да
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default RepoPopup;
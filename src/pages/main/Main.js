import React, {useEffect, useState} from 'react';
import './Main.scss';
import enter from './img/enter.png';
import photo from './img/profile/T24TEY8fPSs.jpg';
import Card from "./components/Card";
import {pagesList} from "../../pagesList";
import Modal from "../../hoc/Modal/Modal";
import {useForm} from "react-hook-form";

const base = [
    {
        login: '123',
        pass: '123'
    }
]

const Main = () => {

    const [cards, setCards] = useState(pagesList);
    const [searchQuery, setSearchQuery] = useState('');
    const [showEnterForm, setShowEnterForm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [auth, setAuth] = useState(false);
    const [login, setLogin] = useState('');
    const { register, handleSubmit } = useForm();

    function handleSelect(val) {
        console.log('ВЫЗОВ сортировки handleSelect');
        const option = val.target.value; // приходит id, name, desc
        setCards([...cards].sort((a, b) => {
                // '' + нужен для конвертации id в string, иначе localeCompare вылетает с ошибкой
                return ('' + a[option]).localeCompare(('' + b[option]));
            })
        );
    }

    function onSubmit(data) {
        if (base.some(item => item.login === data.login && item.pass === data.pass)) {
            setShowError(false);
            setShowEnterForm(false);
            setAuth(true);
            setLogin(data.login);
            console.log('вошли');
        } else {
            setShowError(true);
        }
    }

    return (
        <div className='Portfolio'>
            <header>
                <div className='header__container'>
                    <a className='logo' href='#'>portfolio</a>
                    {
                        auth ?
                            <p>Добро пожаловать, {login}!</p>
                            :
                            <div
                                className='enter'
                                onClick={() => setShowEnterForm(true)}
                            >
                                <img src={enter} alt='вход'/>
                                <p>Войти</p>
                            </div>
                    }
                </div>
            </header>

            <main>
                <div className='container'>
                    <div className="profile">
                        <div className="profile__photo">
                            <img src={photo} alt='фотография'/>
                        </div>
                        <table>
                            <tbody>
                            <tr>
                                <td>Имя:</td>
                                <td>Олег</td>
                            </tr>
                            <tr>
                                <td>Фамилия:</td>
                                <td>Верушкин</td>
                            </tr>
                            <tr>
                                <td>Компания:</td>
                                <td>&lt;здесь могла быть ваша компания&gt;</td>
                            </tr>
                            <tr>
                                <td>Должность:</td>
                                <td>Frontend-разработчик</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='profile__controls'>
                        <div className='profile__sort'>
                            <h3>Сортировать по:</h3>
                            <select onChange={handleSelect} defaultValue='id'>
                                <option value='id'>ID</option>
                                <option value='name'>Названию</option>
                                <option value='desc'>Описанию</option>
                            </select>
                        </div>

                        <div className='profile__filter'>
                            <h3>Найти технологии</h3>
                            <input
                                value={searchQuery}
                                placeholder='введите технологию, например, React'
                                onChange={(val) => setSearchQuery(val.target.value)}
                            />
                        </div>
                    </div>

                    <div className='works'>
                        {
                            cards.map(item => {
                                if (searchQuery.length) {
                                    // если в строке поиска tech что-то есть, то будет проверка на соответствие
                                    if (!item.tech.toLowerCase().includes(searchQuery.toLowerCase().trim())) {
                                        return null;
                                    }
                                }
                                return <Card
                                    key={item.id}
                                    name={item.name}
                                    desc={item.desc}
                                    tech={item.tech}
                                    link={item.link}
                                />
                            })
                        }
                    </div>
                </div>
            </main>
            {
                showEnterForm &&
                <Modal>
                    <div className='modal__bg'>
                        <div className='EnterForm'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    placeholder='логин'
                                    {...register('login')}
                                />
                                <input
                                    placeholder='пароль'
                                    {...register('pass')}
                                />
                                <button
                                    type='submit'
                                >Вход</button>
                                <button
                                    type='button'
                                    onClick={() => setShowEnterForm(false)}
                                >Отмена</button>
                            </form>
                            {
                                showError && <p>неверный логин или пароль</p>
                            }
                        </div>
                    </div>
                </Modal>
            }

        </div>
    )
}

export default Main;

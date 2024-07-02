import React, {useEffect, useState} from 'react';
import moment from "moment-timezone";
import Sandbox from "./Sandbox";

const MomentSandbox = () => {

    const [momentList, setMomentList] = useState([]);

    useEffect(() => {
        
        let time = moment();
        let moscow = moment.tz(time, "Europe/Moscow");
        let newYork = moscow.clone().tz("America/New_York");
        let london = moscow.clone().tz("Europe/London");

        setMomentList([
            'Сейчас (timestamp): ' + time,
            'Форматируем timestamp: ' + time.format('YYYY/MM/DD HH:mm:ss'),
            'Спарсить 2021 08 11: ' + moment('2021 08 11').format('Do MMMM YYYY'),
            'Указать, что мы имели ввиду 8 ноября, а не 11 августа: ' + moment('2021 08 11', 'YYYY DD MM').format('Do MMMM YYYY'),
            moment({
                years: 2020,
                days: 15,
                months: 5,
            }).format('[Дата передана как объект: ]DD.MM.YYYY'),
            moment([2021, 2, 1]).format('[Дата передана как массив: ]DD.MM.YYYY'),
            'Проверка валидности даты: ' + time.isValid(),

            // геттеры
            'Вернуть год: ' + time.year(),
            'Вернуть год, другой способ: ' + time.get('year'),
            // сеттеры
            'Установить год: ' + time.year(2015).format('YYYY MM DD'),
            'Установить месяц: ' + time.set('M', 5).format('DD.MM.YYYY'),

            // манипуляции
            time.add(3, 'days').format('[Прибавлено 3 дня: ]DD.MM.YYYY'),
            time.add(3, 'M').format('[Прибавлено 3 месяца: ]DD.MM.YYYY'),
            time.subtract(2, 'year').format('[Минус 2 года: ]DD.MM.YYYY'),
            time.startOf('w').format('[Неделя началась: ]YYYY MM DD HH:mm:ss'),
            'С 2021 08 15 прошло(fromNow): ' + moment('2021 08 15', 'YYYY MM DD').fromNow(),
            'С 2021 08 15 прошло(calendar): ' + moment('2021 08 15', 'YYYY MM DD').calendar(),
            'С 2021.03.04 до 2021.03.05 12:45:00 прошло: ' + moment('2021 03 04', 'YYYY MM DD').from('2021 03 05 12:45:00'),
            'С 10 декабря 2020 прошло ' + time.diff(moment('2020 12 10').format('YYYY MM DD'), 'hour') + ' часов',
            'Одна дата произошла после другой? ' + time.isAfter('2020 06 06'),
            '2020 05 30 находится между этими датами? ' + moment('2020 05 30').isBetween('2019 08 05', '2021 02 02'),

            // работа с временными зонами
            'В Москве: ' + moscow.format('HH:mm:ss'),
            'В Нью-Йорке: ' + newYork.format('HH:mm:ss'),
            'В Лондоне: ' + london.format('HH:mm:ss'),
            'Универсальный формат UTC +0: ' + moment.utc('2013-02-08 09:00:00Z').format('YYYY:MM:DD HH:ss'),
        ]);

    }, [])

    useEffect(() => {
        return () => {
            setMomentList([]);
        }
    }, [])

    return (
        <Sandbox
            name='Moment'
            list={momentList}
            showOther={false}
        />
    );
};

export default MomentSandbox;
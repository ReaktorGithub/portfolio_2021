import React, {useEffect, useState} from 'react';
import Sandbox from "./Sandbox";

const LodashSandbox = () => {

    const [lodashList, setLodashList] = useState([]);

    useEffect(() => {

        const _ = require('lodash');
        let ar = [1,2,3,56,73,90,42];
        let ar2 = [1,2,null,56,undefined,90,false, ''];
        let str = 'Я - тестовая строка';

        setLodashList([
            // числа, строки
            'Сравнение чисел: ' + _.isEqual(1, 2),
            'Суммировать два числа: ' + _.add(6,3),
            'Вычесть два числа: ' + _.subtract(6,3),
            'Умножить два числа: ' + _.multiply(6,3),
            'Разделить два числа: ' + _.divide(6,3),
            'Находится ли 4 в диапазоне от 3 до 10? ' + _.inRange(4, 3,10),
            _.uniqueId('уникальный id_'),
            _.uniqueId('уникальный id_'),
            'Повторить один и тот же элемент: ' + _.repeat('снова ', 5),
            'Исходная строка str: ' + str,
            'С 4-го индекса начинается слово "тестовая"?: ' + _.startsWith(str, 'тестовая', 4),

            // массивы

            'Исходный массив ar: ' + ar.toString(),
            'Вернуть первый элемент массива: ' + _.first(ar),
            'Суммировать числа в массиве: ' + _.sum(ar),
            'Вернуть максимальное число: ' + _.max(ar),
            'Среднее арифметическое: ' + _.round(_.mean(ar), 2),
            'Найти индекс элемента 42: ' + _.indexOf(ar, 42),
            'Найти индекс элемента 42 по условию: ' + _.findIndex(ar, function (e){
                return e === 42;
            }),
            'Длина массива: ' + _.size(ar),
            'Слить в строку: ' + _.join(ar, ' '),
            'Пересечение массивов: ' + _.join(_.intersection(ar, ar2), ' '),
            'Исключить пересечение: ' + _.join(_.difference(ar, ar2), ' '),
            'Объединить с изъятием дубликатов: ' + _.join(_.union(ar, ar2), ' '),
            'Провести итерацию n раз (аналог цикла for): ' + _.times(6, function (n) {
                return n;
            }),
            'Выбрать случайный элемент массива: ' + _.sample(ar),
        ]);

        // Только в консоли

        console.log('Создать массив с числами от 0 до 10 c шагом 2: ', _.range(0, 11, 2));
        console.log('Поместить все слова в массив: ', _.words('Поместить все слова в массив'));
        console.log('Каждый элемент в новом массиве: ', _.chunk(ar));
        console.log('Исходный массив ar2: ', ar2);
        console.log('Только truthy-значения: ', _.compact(ar2));
        console.log('Удалить 1-й элемент: ', _.drop(ar2));
        console.log('Удалить с конца 3 элемента: ', _.dropRight(ar2, 3));
        console.log('Удалить элементы по условию, подряд слева: ', _.dropWhile(ar2, function(item) { return item < 3}));
        let fillArray = ['qw', 'wrfw'];
        console.log('Заменить элементы исходного массива чем-то другим: ', _.fill(fillArray, 1));
        console.log('Отфильтровать: ', _.filter(ar, function (e){
            return e > 3;
        }));
        console.log('Перемешать: ', _.shuffle(ar2));
        console.log('Удалить 1 и 2 без мутации: ', _.without(ar2, 1, 2));
        console.log('Удалить 1 и 2 навсегда: ', _.pull(ar2, 1, 2));
        console.log('Реверс: ', _.reverse(ar2));
        let flatten = [1, [1, [3, [4]], 5]];
        console.log('Исходный массив flatten: ', flatten);
        console.log('Применение _.flatten: ', _.flatten(flatten));
        console.log('Применение _.flattenDeep: ', _.flattenDeep(flatten));
        let arFloat = [1.12, 3.2, 5.9, 8.34, 5.1, 5,3];
        console.log('Исходный массив: ', arFloat);
        console.log('Группировать с использованием Math.floor: ', _.groupBy(arFloat, Math.floor));

        // Не чаще 1 раз в 10 секунд передавать координаты мыши:
        window.onmousemove = _.throttle((e) => {
                console.log('Мышь X: ' + e.clientX + ' Мышь Y: ' + e.clientY);
            }, 10000);

        // коллекции

        let collect = [
            {id: 1, name: 'Oleg'},
            {id: 2, name: 'Ivan'},
            {id: 3, name: 'Kolya'},
            {id: 4, name: 'Irina'},
        ]
        console.log('Исходный массив: ', collect);
        console.log('Сортировать по id в обратном порядке: ', _.orderBy(collect, ['id'], ['desc']));
        console.log('forEach, удвоим каждое число id: ', _.forEach(collect, function (item) {
            if (_.isNumber(item.id)) {
                item.id *= 2
            }
        }));
        console.log('Отфильтровать по Oleg: ', _.filter(collect, {name: 'Oleg'}));
        console.log('Вернуть первое попавшееся имя на I: ', _.find(collect, function (item) {
            return _.startsWith(item.name, 'I');
        }));
        console.log('Объект с самым большим id: ', _.maxBy(collect, 'id'));
        console.log('Копирование объекта со всеми подуровнями: ', _.cloneDeep(collect));
        console.log('Добавить новый ключ в объект: ', _.assign({test: 5}, collect[0]));
        let obj = {id: 1, name: 'Oleg', age: 35};
        console.log('Исходный объект obj: ', obj);
        console.log('Удалить ключи: ', _.omit(obj, ['name', 'age']));

        // разное в Lodash
        _.delay(() => {
            console.log('Задержка 2 сек');
        }, 2000)

        console.log('Попытаться вызвать функцию: ');
        let result = _.attempt(function () {
            return document.querySelect('test');
        });
        if (_.isError(result)) {
            console.log('Поймана ошибка: ', result.name);
        } else {
            console.log('Нет ошибки: ', result);
        }

        return () => {
            window.onmousemove = null;
            setLodashList([]);
        }

    }, [])

    return (
        <Sandbox
            name='Lodash'
            list={lodashList}
            showOther={true}
        />
    );
};

export default LodashSandbox;
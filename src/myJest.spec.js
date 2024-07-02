const axios = require("axios");

describe.skip('тренировочные тесты', () => {

    function sum(a,b) {
        return a+b;
    }

    test('Тест суммы', () => {
        expect(sum(4,5)).toBe(9); // должно быть 9
        expect(sum(4,5)).toBeGreaterThan(8);
        expect(sum(4,5)).toBeGreaterThanOrEqual(8);
        expect(sum(4,5)).toBeLessThan(10);
        expect(sum(4,5)).toBeLessThanOrEqual(10);
        expect(sum(3, -3)).toBeFalsy();
        expect(sum(4,5)).not.toBe(100); // метод отрицания, после него может быть любой мэтчер
    })

    function divide(a,b) {
        return a/b;
    }

    it('Тест деления', () => {
        expect(divide(15.02, 5)).toBeCloseTo(3); // округляет числа с плавающей точкой, ожидает разницу не более 0.005
        expect(divide('ddd', 12)).toBeNaN();
        expect(divide).toBeDefined(); // определенное значение, например определилась ли функция
        expect(divide(4,5)).toBeTruthy();
    })

    let arr = [1,2,3];
    let arr2 = [1,2,[3,4]];

    it('Тест массива', () => {
        expect(arr).toContain(1);
        expect(arr).toBeInstanceOf(Array);
        expect(arr).not.toEqual(arr2);
        expect(arr).toHaveLength(3);
    })

    it ('разное', () => {
        expect('Banana').toMatch(/Ba/); // соответствие регулярке
    })

// тестирование асинхронного кода

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(21);
        }, 100);
    })

    test('тест асинхронного кода', async () => {
        const result = await promise;
        expect(result).toBe(21);
    })
})



// имитация запроса с помощью моков

/*
TODO: доделать
 */

/*
describe('обертка для axios', () => {

    jest.mock('axios');

    let response;
    beforeEach(() => {
        response = {userId: 1, data: 'string'};
    })

    test('асинхронный код', async () => {
        const result = await axios.get(response)
            .then(response => {
                console.log(response.data);
                return response.data;
            });
        expect(result).toContainEqual('userId');
    })
})


*/


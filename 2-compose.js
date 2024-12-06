'use strict';

const compose = (...fns) => {
    // обработчики ошибок - массив функции
    const errorHandlers = [];
    const composed = x => {

        // при пустом массиве функций просто вернуть х
        if (fns.length == 0) return x;

        // композиция переденанных функций справа налево
        let result = x;

        try{
        for (let index = fns.length - 1; index >= 0; index--) {
            let f = fns[index];
            result = f(result);
            // console.log(result);
        }
        return result;
    }
    catch (error) {
        // console.log(error);
    errorHandlers.forEach(element => {
        element('error', error);
            
        });
        return undefined;
        }
    };

    composed.on = (name, handler) => {
        if(name === 'error') {
           errorHandlers.push(handler);
    }
};
return composed;
}

/*
const inc = x => {
    if(x > 3) throw new Error('inc error');
    ++x;
    return x;
}
const twice = x => x * 2;
const cube = x => x ** 3;

const f = compose(inc, twice, cube);

f.on('error', () => {console.log('Error!');});

console.log(f(3));
*/
module.exports = { compose };
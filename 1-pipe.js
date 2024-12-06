'use strict';

const pipe = (...fns) => {
    // проверка правильности аргументов слева на право
    fns.forEach(element => {
        if (typeof(element) !== 'function') {
            throw new Error("Not a function");
        }
    });
    return (x) => {
        // при пустом маиссиве просто вернем x
        if(fns.length == 0) return x;
        // все аргументы - функции, вызываемых их с передачей 
        // следующей функции результата предыдущей
        let result = x;
        fns.forEach(element => {
            result = element(result);
        });
    
        return result;
    };
};

const inc = x => ++x;
const twice = x => x * 2;
const cube = x => x ** 3;

let f = pipe(inc, twice, cube);
console.log(f(5));

f = pipe(inc, inc);

console.log(f(7));

f = pipe(inc, 7, cube);
f(0);
module.exports = { pipe };

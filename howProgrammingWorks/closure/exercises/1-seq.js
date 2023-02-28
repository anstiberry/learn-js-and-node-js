'use strict';

const seq = (f) => (g) => (typeof g === 'number' ? f(g) : seq((x) => f(g(x))));

/*
seq(x => x + 7)
   (x => x * 2)(5)
// Result: 17

seq(x => x * 2)
   (x => x + 7)(5)
// Result: 24

seq(x => x + 1)
   (x => x * 2)
   (x => x / 3)
   (x => x - 4)(7)
// Result: 3
*/

module.exports = { seq };

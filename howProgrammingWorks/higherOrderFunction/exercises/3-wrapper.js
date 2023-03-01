'use strict';

// Implement function contract(fn, ...types) to wrap fn (first argument)
// and check argument types (all arguments except first and last)
// and result type (last argument). Generates TypeError exception if wrong
// types detected. As in following example:

// const add = (a, b) => a + b;
// const addNumbers = contract(add, Number, Number, Number);
// const res = addNumbers(2, 3);
// console.dir(res); // Output: 5

// const concat = (s1, s2) => s1 + s2;
// const concatStrings = contract(concat, String, String, String);
// const res = concatStrings('Hello ', 'world!');
// console.dir(res); // Output: Hello world!

const contract = (fn, ...types) => (...args) => {
  for (let i = 0; i < args.length - 1; i++) {
    const argument = args[i];
    const type = types[i];
    if (typeof argument !== type.name.toLowerCase()) {
      throw new TypeError('Invalid argument type');
    }

    const result = fn(...args);
    const resultType = types[args.length];
    if (typeof result !== resultType.name.toLowerCase()) {
      throw new TypeError('Invalid result type');
    }

    return result;
  }
};

module.exports = { contract };

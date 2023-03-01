'use strict';

// Implement function store(value) to store value inside closure of
// returning function. After calling returning function it will return
// a value from closure, like in the following example:

// const read = store(5);
// const value = read();
// console.log(value); // Output: 5

const store = (x) => () => x;

module.exports = { store };

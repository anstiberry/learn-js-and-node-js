'use strict';

const array = () => {
  const closureArray = [];
  const getter = (x) => closureArray[x];
  getter.push = (x) => (closureArray.push(x), closureArray);
  getter.pop = () => closureArray.pop();
  return getter;
};

/*
const arr = array();

arr.push('first');
arr.push('second');
arr.push('third');

console.log(arr(0)); // Print: first
console.log(arr(1)); // Print: second
console.log(arr(2)); // Print: third

console.log(arr.pop()); // Print: third
console.log(arr.pop()); // Print: second
console.log(arr.pop()); // Print: first

console.log(arr.pop()); // Print: undefined
*/

module.exports = { array };

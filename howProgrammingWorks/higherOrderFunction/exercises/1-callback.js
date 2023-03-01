'use strict';

// Implement function iterate(object, callback) to iterate given object
// passing each element to callback with the following contract
// callback(key, value, object).

// Example:
// const obj = { a: 1, b: 2, c: 3 };
// iterate(obj, (key, value) => {
//   console.log({ key, value });
// });

// Output:
// { key: 'a', value: 1 }
// { key: 'b', value: 2 }
// { key: 'c', value: 3 }

const iterate = (object, callback) => {
  for (const key in object) {
    const value = object[key];
    callback(key, value, object);
  }
};

module.exports = { iterate };

'use strict';

// implement time expiration cache

const argKey = (x) => x.toString() + ':' + typeof x;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, cacheTime) => {
  const cache = new Map();

  return (...args) => {
    const key = generateKey(args);
    console.log(`${fn.name}(${key}) call`);

    if (cache.has(key)) {
      return cache.get(key);
    }

    console.log(`max(${key}) calculate`);
    const res = fn(...args);

    cache.set(key, res);

    setTimeout(() => {
      console.log('Delete key:', key);
      cache.delete(key);
    }, cacheTime);

    return res;
  };
};

// Usage

const max = (a, b) => (a > b ? a : b);
const mMax = memoize(max, 1000);

mMax(10, 8);
mMax(15, 2);

setTimeout(() => mMax(10, 8), 500); // get from cache
setTimeout(() => mMax(15, 2), 2000); // calculate

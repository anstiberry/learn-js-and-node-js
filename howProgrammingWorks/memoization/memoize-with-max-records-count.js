'use strict';

// implement memoize with max records count and removing least used

const argKey = (x) => x.toString() + ':' + typeof x;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn, length) => {
  const cache = Object.create(null);

  return (...args) => {
    const key = generateKey(args);
    console.log(`${fn.name}(${key}) call`);

    const cacheValue = cache[key];
    if (cacheValue) {
      cacheValue.numberOfCalls += 1;
      return cacheValue.value;
    }

    console.log(`max(${key}) calculate`);
    const res = fn(...args);

    if (Object.keys(cache).length >= length) {
      const leastUsed = Object.entries(cache).sort(
        (a, b) => a[1].numberOfCalls - b[1].numberOfCalls
      )[0];

      const leastUsedKey = leastUsed[0];
      console.log('Delete key:', leastUsedKey);
      delete cache[leastUsedKey];
    }

    cache[key] = {
      value: res,
      numberOfCalls: 1,
    };

    return res;
  };
};

// Usage

const max = (a, b) => (a > b ? a : b);
const mMax = memoize(max, 3);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(12, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);
mMax(0, 0);
mMax(0, 0);

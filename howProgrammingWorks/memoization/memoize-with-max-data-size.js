'use strict';

// implement memoize with max total stored data size

const argKey = (x) => x.toString() + ':' + typeof x;
const generateKey = (args) => args.map(argKey).join('|');

const getCacheSize = (cache) => {
  const stringifiedCache = JSON.stringify(Array.from(cache.entries()));
  const size = Buffer.from(stringifiedCache).byteLength;
  return size;
};

const memoize = (fn, maxCacheSize) => {
  const cache = new Map();

  return (...args) => {
    const key = generateKey(args);
    console.log(`${fn.name}(${key}) call`);

    if (cache.has(key)) {
      return cache.get(key);
    }

    console.log(`max(${key}) calculate`);
    const res = fn(...args);

    let cacheSize = getCacheSize(cache);
    while (cacheSize >= maxCacheSize) {
      const firstKey = cache.keys().next().value;
      console.log('Delete key:', firstKey);
      cache.delete(firstKey);
      cacheSize = getCacheSize(cache);
    }

    cache.set(key, res);

    return res;
  };
};

// Usage

const max = (a, b) => (a > b ? a : b);
const mMax = memoize(max, 60);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(12, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);
mMax(0, 0);
mMax(0, 0);

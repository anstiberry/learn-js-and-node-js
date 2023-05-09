'use strict';

// implement functional object with following properties methods and events:
// memoized.clear() - clear cache
// memoized.add(key, value) - add value to cache
// memoized.del(key) - remove value from cache
// memoized.get(key) - returns saved value
// memoized.timeout: Number - cache timeout
// memoized.maxSize: Number - maximum cache size in bytes
// memoized.maxCount: Number - maximum cache size in item count
// memoized.on('add', Function)
// memoized.on('del', Function)
// memoized.on('clear', Function)

const argKey = (x) => x.toString() + ':' + typeof x;
const generateKey = (args) => args.map(argKey).join('|');

const getCacheSize = (cache) => {
  const stringifiedCache = JSON.stringify(cache);
  const size = Buffer.from(stringifiedCache).byteLength;
  return size;
};

const getLeastUsedCacheKey = (cache) => {
  const leastUsed = Object.entries(cache).sort(
    (a, b) => a[1].numberOfCalls - b[1].numberOfCalls
  )[0];
  return leastUsed[0];
};

const memoize = (fn) => {
  const cache = Object.create(null);
  const events = [];
  const emit = (event, key, value) => {
    for (const fn of events[event]) {
      fn(key, value);
    }
  };

  const memoized = (...args) => {
    const key = generateKey(args);
    console.log(`${fn.name}(${key}) call`);

    const cacheValue = cache[key];
    if (cacheValue) {
      cacheValue.numberOfCalls += 1;
      return cacheValue.value;
    }

    console.log(`max(${key}) calculate`);
    const res = fn(...args);

    if (memoized.maxSize) {
      let cacheSize = getCacheSize(cache);
      while (cacheSize >= memoized.maxSize) {
        const leastUsedKey = getLeastUsedCacheKey(cache);
        memoized.delete(leastUsedKey);
        cacheSize = getCacheSize(cache);
      }
    }

    if (memoized.maxCount) {
      if (Object.keys(cache).length >= memoized.maxCount) {
        const leastUsedKey = getLeastUsedCacheKey(cache);
        memoized.delete(leastUsedKey);
      }
    }

    if (memoized.timeout) {
      setTimeout(() => memoized.delete(key), memoized.timeout);
    }

    memoized.add(key, res);

    return res;
  };

  memoized.on = (event, fn) => {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(fn);
  };

  memoized.add = (key, value) => {
    cache[key] = { value, numberOfCalls: 1 };
    emit('add', key, value);
  };

  memoized.get = (key) => cache[key].value;

  memoized.delete = (key) => {
    const cacheValue = cache[key];
    if (cacheValue) {
      delete cache[key];
      emit('del', key, cacheValue.value);
    }
  };

  memoized.clear = () => {
    for (const key in cache) {
      memoized.delete(key);
    }
    emit('clear');
  };

  memoized.timeout = null;
  memoized.maxSize = null;
  memoized.maxCount = null;

  return memoized;
};

// Usage

const max = (a, b) => (a > b ? a : b);
const memoized = memoize(max);

memoized.on('add', (key, value) => {
  console.log(`Added key: ${key}, value: ${value}`);
});
memoized.on('del', (key, value) => {
  console.log(`Deleted key: ${key}, value: ${value}`);
});
memoized.on('clear', () => {
  console.log('Cleared');
});

memoized.maxSize = 50;

memoized(10, 8);
memoized(10, 8);
memoized(1, 15);
memoized(12, 3);
memoized(15, 2);
memoized(1, 15);
memoized(10, 8);

memoized.clear();

memoized.maxSize = null;
memoized.maxCount = 3;
memoized.timeout = 1000;

memoized(10, 8);
memoized(10, 8);
memoized(1, 15);
memoized(12, 3);
memoized(15, 2);
memoized(1, 15);
memoized(10, 8);

setTimeout(() => memoized(10, 8), 500); // get from cache
setTimeout(() => memoized(15, 2), 2000); // calculate

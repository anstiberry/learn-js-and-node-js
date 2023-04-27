'use strict';

// implement universal memoize compatible with both sync and async function

const fs = require('node:fs');
const path = require('node:path');

const argKey = (x) => x.toString() + ':' + typeof x;
const generateKey = (args) => args.map(argKey).join('|');

const memoize = (fn) => {
  const cache = Object.create(null);

  return (...args) => {
    let cb;
    if (typeof args[args.length - 1] === 'function') {
      cb = args.pop();
    }

    const key = generateKey(args);
    const val = cache[key];

    console.log('Key', key);

    if (val) {
      console.log('Get from cache');
      if (cb) {
        cb(val.err, val.data);
        return;
      }
      return val;
    }

    if (cb) {
      fn(...args, (err, data) => {
        console.log('Save key:', key);
        cache[key] = {err, data};
        cb(err, data);
      });
    } else {
      const res = fn(...args);
      cache[key] = res;
      return res;
    }
  };
};

// Usage

const max = (a, b) => (a > b ? a : b);
const mMax = memoize(max);

mMax(10, 8);
mMax(10, 8);
mMax(1, 15);
mMax(1, 12);
mMax(12, 3);
mMax(15, 2);
mMax(1, 15);
mMax(10, 8);

const mReadFile = memoize(fs.readFile);

mReadFile(path.join(__dirname, 'cache-by-time.js'), 'utf8', (err, data) => {
  console.log('data length:', data?.length);
  mReadFile(path.join(__dirname, 'cache-by-time.js'), 'utf8', (err, data) => {
    console.log('data length:', data?.length);
  });
});

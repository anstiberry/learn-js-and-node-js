'use strict';

const pipe = (...fns) => {
  if (fns.some((fn) => typeof fn !== 'function')) {
    throw new Error('some parameters are not functions.');
  }
  return (x) => fns.reduce((v, f) => f(v), x);
};

module.exports = { pipe };

'use strict';

// implement wrap(obj, ...funcs) so if obj contains func.name it should be wrapped

const wrap = (obj, ...funcs) => {
  for (const func of funcs) {
    if (obj.hasOwnProperty(func.name)) {
      obj[func.name] = (...args) => {
        console.log('Start wrapping');
        const result = func.bind(obj)(...args);
        console.log('Wrapping ended');
        return result;
      };
    }
  }
  return obj;
};

// Usage

const obj1 = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  born: '121-04-26',
  toString() {
    return `${this.name} was born in ${this.city} in ${this.born}`;
  },
  age() {
    const year = new Date().getFullYear();
    const born = new Date(this.born).getFullYear();
    return year - born;
  },
};

wrap(obj1, obj1.toString, obj1.age);
console.log(obj1.toString());
console.log(`His age is ${obj1.age()} as of today`);

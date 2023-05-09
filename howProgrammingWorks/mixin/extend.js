'use strict';

// implement extend(obj, ...objects) so keys from objects will be mixed
// into obj only if it doesn't contain those keys

const extend = (obj, ...objects) => {
  for (const object of objects) {
    const keys = Object.keys(object);
    for (const key of keys) {
      if (!(key in obj)) {
        obj[key] = object[key];
      }
    }
  }
  return obj;
};

// Usage

const obj1 = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  born: '121-04-26',
};

const mix1 = {
  name: 'Marcus',
  age() {
    const year = new Date().getFullYear();
    const born = new Date(this.born).getFullYear();
    return year - born;
  },
};

const mix2 = {
  city: 'Kyiv',
  toString() {
    return `${this.name} was born in ${this.city} in ${this.born}`;
  },
};

extend(obj1, mix1, mix2);
console.log(obj1);
console.log(obj1.toString());
console.log(`His age is ${obj1.age()} as of today`);

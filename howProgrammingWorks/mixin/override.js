'use strict';

// implement extend for mixins with additional override:Boolean flag

const extend = (obj, ...mixins) => {
  for (const mixin of mixins) {
    for (const mixinObj of mixin) {
      const override = mixinObj.override || false;
      const keys = Object.keys(mixinObj);
      for (const key of keys) {
        if (key === 'override') continue;
        if (!obj.hasOwnProperty(key) || override === true) {
          obj[key] = mixinObj[key];
        }
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
  toString() {
    return `${this.name} was born in ${this.city} in ${this.born}`;
  },
  age() {
    return 59;
  },
};

const mix1 = [
  {
    override: true,
    name: 'Marcus Aurelius Antoninus Augustus',
  },
];

const mix2 = [
  {
    override: true,
    toString() {
      return `${this.name} - ${this.city} - ${this.born}`;
    },
  },
  {
    override: false,
    age() {
      const year = new Date().getFullYear();
      const born = new Date(this.born).getFullYear();
      return year - born;
    },
  },
];

extend(obj1, mix1, mix2);
console.log(obj1);
console.log(obj1.toString());
console.log(`His age is ${obj1.age()}`);

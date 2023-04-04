'use strict';

// implement emitable with Object.defineProperty

const emitable = (obj, events = {}) => {
  Object.defineProperty(obj, 'on', {
    value: (name, fn) => {
      const event = events[name] || [];
      events[name] = event;
      event.push(fn);
    },
  });
  Object.defineProperty(obj, 'emit', {
    value: (name, ...data) => {
      const event = events[name];
      if (event) {
        for (const fn of event) {
          fn(...data);
        }
      }
    },
  });
  return obj;
};

const movable = (obj) => {
  obj.on('move', (x, y) => {
    console.log('move', x, y);
    obj.x += x;
    obj.y += y;
    obj.emit('moved');
  });
  return obj;
};

// Usage

const Rect = class {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  toString() {
    return `[${this.x}, ${this.y}, ${this.width}, ${this.height}]`;
  }
};

const r1 = movable(emitable(new Rect(10, 20, 50, 150)));
console.log(r1.toString());
r1.on('moved', () => {
  console.log(r1.toString());
});
r1.emit('move', 10, 20);

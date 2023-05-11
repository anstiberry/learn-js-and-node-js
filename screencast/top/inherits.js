var util = require('util');

//Parent
function Animal(name) {
    this.name = name;
}

Animal.prototype.walk = function () {
    console.log('Walk ' + this.name);
};

//Children
function Rabbit(name) {
    this.name = name;
}

util.inherits(Rabbit, Animal);

Rabbit.prototype.jump = function () {
    console.log("Jump " + this.name)
};

//Usage
var rabbit = new Rabbit("Pumpkin");
rabbit.walk();
rabbit.jump();
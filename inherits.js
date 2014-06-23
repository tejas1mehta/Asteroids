Function.prototype.inherits = function  (obj) {
    function surrogate () {};
    surrogate.prototype = obj.prototype;
    this.prototype = new surrogate();
}



function MovingObject() {};

MovingObject.prototype.shoot = function () {
    console.log("I'm shooting");
}

function Ship () {};

Ship.inherits(MovingObject);

Ship.prototype.foo = function () {
    console.log('Asteroid/MovingObject should not have this');
}

function Asteroid () {};
Asteroid.inherits(MovingObject);


var me = new Ship();
me.shoot();

var you = new MovingObject();
me.foo();

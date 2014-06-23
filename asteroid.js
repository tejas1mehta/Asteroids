(function (obj) {
    var Asteroids = obj.Asteroids = (obj.Asteroids || {} );

    Function.prototype.inherits = function  (obj) {
        function surrogate () {};
        surrogate.prototype = obj.prototype;
        this.prototype = new surrogate();
    }

    var Asteroid = Asteroids.Asteroid = function(pos, velocity, color, radius){
        Asteroids.MovingObject.call(this, pos, velocity);
        this.COLOR = color;
        this.RADIUS = radius;
    }

    Asteroid.inherits(Asteroids.MovingObject);

    Asteroid.prototype.randomAsteroid = function(dimX, dimY) {
        var xCoord = Math.random() * dimX;
        var yCoord = Math.random() * dimY;
        var velocity = Asteroid.prototype.randomVec();

        var newAsteroid = new Asteroid([xCoord, yCoord], velocity, "brown", 50)

        return newAsteroid
    }

    Asteroid.prototype.randomVec = function(){
        return [ (Math.random() * 2) - 1 , (Math.random() * 2) - 1]
    }

})(this);
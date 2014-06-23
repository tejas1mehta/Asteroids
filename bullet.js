(function (obj) {
    var Asteroids = obj.Asteroids = (obj.Asteroids || {} );

    var Bullet = Asteroids.Bullet = function (pos, direction, game) {
        Asteroids.MovingObject.call(this, pos);
        this.direction = direction;
        this.velocity = direction.map( function (el) {
            return el * 20;
        })
        this.COLOR = 'purple';
        this.RADIUS = 5;
        this.game = game;
    }

    Bullet.inherits(Asteroids.MovingObject);

    Bullet.prototype.hitAsteroids = function () {
        var bullet = this;
        var asteroids = this.game.asteroids;
        var numAsteroids = asteroids.length;
        for (var i = 0; i < numAsteroids; i++){
            if (bullet.isCollidedWith(asteroids[i])){
                this.game.removeAsteroid(asteroids[i]);
                this.game.removeBullet(this);
            }
        }

    };

    Bullet.prototype.move = function () {
        Asteroids.MovingObject.prototype.move.call(this);
        this.hitAsteroids();
    };



})(this);
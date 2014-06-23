(function (obj) {
    var Asteroids = obj.Asteroids = (obj.Asteroids || {} );

    var Ship = Asteroids.Ship = function(pos, game){
        Asteroids.MovingObject.call(this, pos, [0,0]);
        this.RADIUS = 20;
        this.COLOR = "yellow";
        this.game = game;
    }
    Ship.inherits(Asteroids.MovingObject);

    Ship.prototype.power = function(impulse) {
        this.velocity[0] += impulse[0];
        this.velocity[1] += impulse[1];
        console.log(this.velocity)
    }

    Ship.prototype.fireBullet = function () {
        if (this.velocity === [0,0]) {
            return;
        }
        var speed =  (Math.sqrt(Math.pow(this.velocity[0], 2) + Math.pow(this.velocity[1], 2)));
        var direction = [this.velocity[0] / speed, this.velocity[1] / speed];
        var currentShip = this;
        var newPos = this.pos.slice();
        return new Asteroids.Bullet(newPos, direction, this.game);
    }

    Ship.prototype.outOfBounds = function (dim_x, dim_y) {
        var xCoordUp = this.pos[0] + this.RADIUS;
        var xCoordDown = this.pos[0] - this.RADIUS;
        var yCoordUp = this.pos[1] + this.RADIUS;
        var yCoordDown = this.pos[1] - this.RADIUS;


        if (xCoordUp < 0){
            this.pos[0] = dim_x;
        }
        else if (xCoordDown > dim_x){
            this.pos[0] = 0;
        }
        else if (yCoordUp < 0){
            this.pos[1] = dim_y;
        }
        else if (yCoordDown > dim_y) {
            this.pos[1] = 0;
        }

    }

})(this);
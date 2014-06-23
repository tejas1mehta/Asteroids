(function (obj) {
    var Asteroids = obj.Asteroids = (obj.Asteroids || {} );

    var MovingObject = Asteroids.MovingObject = function (pos, velocity, radius, color){
        this.pos = pos;
        this.velocity = velocity;

    }

    MovingObject.prototype.move = function(){
        this.pos[0] += this.velocity[0];
        this.pos[1] += this.velocity[1];
    };

    MovingObject.prototype.draw = function(ctx){
        ctx.fillStyle = this.COLOR;
        ctx.beginPath();


        ctx.arc(
          this.pos[0],
          this.pos[1],
          this.RADIUS,
          0,
          2 * Math.PI,
          false
        );
        ctx.fill();
    };

    MovingObject.prototype.isCollidedWith = function(otherObj) {
        var sumRadii = this.RADIUS + otherObj.RADIUS;
        var distance = Math.sqrt( Math.pow((this.pos[0] - otherObj.pos[0]), 2)
        + Math.pow((this.pos[1] - otherObj.pos[1]), 2) );

        // console.log(distance);

        if (distance < sumRadii){
            return true;
        } else {
            return false;
        }
    };

    MovingObject.prototype.outOfBounds = function (dim_x, dim_y) {
        var xCoordUp = this.pos[0] + this.RADIUS;
        var xCoordDown = this.pos[0] - this.RADIUS;
        var yCoordUp = this.pos[1] + this.RADIUS;
        var yCoordDown = this.pos[1] - this.RADIUS;


        if ((xCoordUp < 0 || xCoordDown > dim_x) ||
            (yCoordUp < 0 || yCoordDown > dim_y)) {

            return true;

        }
        return false;

    }



})(this);
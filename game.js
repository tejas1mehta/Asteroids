(function (obj) {
    var Asteroids = obj.Asteroids = (obj.Asteroids || {} );

    var Game = Asteroids.Game = function(canvas){
        this.ctx = canvas.getContext("2d");
        this.DIM_X = 800;
        this.DIM_Y = 600;
        this.FPS = 30;
        var collision = true
        this.ship = new Asteroids.Ship([(this.DIM_X)/2, (this.DIM_Y)/2], this);
        while (collision){
            this.asteroids = Game.prototype.addAsteroids.call(this,15);
            this.bullets = [];
            var collision = false;
            var that = this;
            this.asteroids.forEach(function (asteroid) {
                if (asteroid.isCollidedWith(that.ship)) {
                    collision = true; 
                }
            })
        }
    }

    Game.prototype.addAsteroids = function(numAsteroids){
        var asteroids = [];
        var that = this;
        for (var i = 0; i < numAsteroids; i++ ){
            asteroids.push( Asteroids.Asteroid.prototype.randomAsteroid(that.DIM_X, that.DIM_Y) ) // change asteroid syntax
        }

        return asteroids
    };

    Game.prototype.draw = function() {

        this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.img.onload();
        var currentGame = this
        this.asteroids.forEach(function(asteroid){
            asteroid.draw(currentGame.ctx);
        });
        this.ship.draw(currentGame.ctx);
        this.bullets.forEach(function(bullet){
            bullet.draw(currentGame.ctx);
        })

    };

    Game.prototype.move = function() {
        this.asteroids.forEach(function(asteroid){
            asteroid.move();
        });

        this.ship.move();

        this.bullets.forEach(function(bullet){
            bullet.move();
        });

    };

    Game.prototype.step = function(){
        this.checkKeys();
        this.isOutOfBounds();
        this.move();
        this.checkCollisions();
        this.hasWon();
        this.draw();
    };

    Game.prototype.start = function(){
        this.img = new Image();
        var currentGame = this
        var ctx = this.ctx
        this.img.onload = function () {
          ctx.drawImage(currentGame.img, 0, 0);
        };
        this.img.src = 'space_0.jpg';

        console.log(this.img.onload);



        //this.bindKeyHandlers()
        this.timerId = setInterval(this.step.bind(this), this.FPS);
    };

    Game.prototype.bindKeyHandlers = function(){
        // key("up", function(){ currentGame.ship.power([0, -1]) });
        // key("down", function(){ currentGame.ship.power([0,1])});
        // key("left", function(){ currentGame.ship.power([-1,0])});
        // key("right", function(){ currentGame.ship.power([1,0])});
        // key("space", function(){ currentGame.fireBullet() });

    }

    Game.prototype.checkKeys = function () {
        var currentGame = this;
        var currentShip = this.ship;

        if (key.isPressed('up')) {
            currentGame.ship.power([0, -0.6]);
        }
        if (key.isPressed('down')) {
            currentGame.ship.power([0, 0.6]);
        }
        if (key.isPressed('left')) {
            currentGame.ship.power([-0.6, 0]);
        }
        if (key.isPressed('right')) {
            currentGame.ship.power([0.6, 0]);
        }
        if (key.isPressed('space')) {
            currentGame.fireBullet();
        }
    }

    Game.prototype.fireBullet = function () {
        this.bullets.push(this.ship.fireBullet());
    }

    Game.prototype.showAsteroids = function(){
        console.log(this.asteroids);
    };

    Game.prototype.checkCollisions = function () {
        var that = this;
        this.asteroids.forEach(function (asteroid) {
            if (asteroid.isCollidedWith(that.ship)) {
                that.stop();
                alert('YOU DIED');
            }
        })
    };

    Game.prototype.hasWon = function () {
        if (this.asteroids.length == 0){
                alert('YOU WON!');
                this.stop();
        } 
    };

    Game.prototype.removeAsteroids = function(){
        var currentGame = this;
        this.asteroids = this.asteroids.filter( function (asteroid) {
            return !asteroid.outOfBounds(currentGame.DIM_X, currentGame.DIM_Y);

        });
    };

    Game.prototype.stop = function () {
        clearInterval(this.timerId);
    };

    Game.prototype.removeBullet = function(bullet) {
        var indexBullet = this.bullets.indexOf(bullet);
        this.bullets.splice(indexBullet, 1);
    };

    Game.prototype.removeAsteroid = function(asteroid) {
        var indexAsteroid = this.asteroids.indexOf(asteroid);
        this.asteroids.splice(indexAsteroid, 1);
    };

    Game.prototype.isOutOfBounds = function (object) {
        currentGame = this;

        this.ship.outOfBounds(this.DIM_X, this.DIM_Y)

        this.bullets = this.bullets.filter(function(bullet) {
             return !bullet.outOfBounds(currentGame.DIM_X, currentGame.DIM_Y)
        });

        this.asteroids = this.asteroids.filter(function(asteroid) {
             return !asteroid.outOfBounds(currentGame.DIM_X, currentGame.DIM_Y)
        });
    };

})(this);
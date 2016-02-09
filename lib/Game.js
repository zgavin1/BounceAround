(function () {
  if (typeof Trampoline === "undefined") {
    window.Trampoline = {};
  };

  var Game = Trampoline.Game = function (args) {
    this.jumper = {};
    this.tramp = {};

    this.addJumper()
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  // Game.

  Game.prototype.addJumper = function() {
    // body...
    this.jumper
  };

  Game.prototype.step = function(first_argument) {
    
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    Asteroids.Jumper.draw(ctx);
  };

  Game.prototype.moveObjects = function () {

  };


})();
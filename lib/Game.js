(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var Game = MyTrampoline.Game = function () {
    this.jumper = {};
    this.trampoline = {};

    this.addSmallRedJumper();
    this.addTrampoline();
    // debugger
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;

  Game.prototype.addSmallRedJumper = function() {
    this.jumper = new MyTrampoline.SmallRedJumper({ game: this, position: {x: 494, y: 290} , test: [0, 0]});
  };

  Game.prototype.addTrampoline = function() {
    this.trampoline = new MyTrampoline.Trampoline({ game: this, pos: [250, 550] });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    if (this.jumper.rotV < 0 && this.jumper.isRotating) {
      this.jumper.rotV -= .1;
    } else if (this.jumper.rotV > 0 && this.jumper.isRotating) {
      this.jumper.rotV += .1;
    }

    this.jumper.draw(ctx);
    this.trampoline.draw(ctx);
  };

  Game.prototype.moveObjects = function () {
    this.jumper.move();
    this.trampoline.move();
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkBouncing();
  };

   Game.prototype.checkBouncing = function () {
    if (this.jumper.isBouncing(this.trampoline)) {
      this.jumper.bounce();
    //   this.trampoline.bounce();
    // } else {
    //   this.trampoline.rebound();
    }
  };

})();
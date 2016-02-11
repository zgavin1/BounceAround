(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var Game = MyTrampoline.Game = function () {
    this.jumper = {};
    this.trampoline = {};

    this.addSmallRedJumper();
    this.addTrampoline();
    this.points = 0;
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

    this.jumper.draw(ctx);
    this.trampoline.draw(ctx);
    ctx.font="30px Comic Sans"
    ctx.fillText(this.points, 30, 30);
  };

  Game.prototype.moveObjects = function () {
    this.jumper.move();
    this.trampoline.move();
  };

  Game.prototype.step = function() {
    this.moveObjects();
    if (this.checkBouncing()) {
      this.jumper.bounce();
    };
    this.addPoints();
  };

  Game.prototype.checkBouncing = function () {
    return this.jumper.isBouncing(this.trampoline);
  };

  Game.prototype.addPoints = function () {
    if (this.jumper.isRotating && this.jumper.isCrouching) {
      this.points += 5;
    }

    if (this.jumper.isRotating) {
      this.points += 1;
    }
  };

})();
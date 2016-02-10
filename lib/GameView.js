(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var GameView = MyTrampoline.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    // this.ctx



    this.bindKeyHandlers();

    var gameloop = function (){
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this);

    setInterval(gameloop, 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('left', function(){ this.game.jumper.powerSpin(-1) }.bind(this));
    key('right', function(){ this.game.jumper.powerSpin(1) }.bind(this));
  };


})();
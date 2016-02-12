(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var GameView = MyTrampoline.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.running = false;
    this.intervalId;
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();

    this.loop();

    
  };

  GameView.prototype.loop = function () {
    var gameloop = function (){
      if (this.game.gameOver) {
        clearInterval(this.intervalId);
        this.game.drawGameOver(this.ctx);
        return;
      }

      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this);

    this.intervalId = setInterval(gameloop, 20);
    this.running = true;

  }

  GameView.prototype.togglePause = function () {
    if (this.running) {
      clearInterval(this.intervalId);
      this.running = false;
    } else {
      this.loop();
      this.running = true;
    }
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('left', function(){ this.game.jumper.powerSpin(-1); }.bind(this));
    key('right', function(){ this.game.jumper.powerSpin(1); }.bind(this));
    key('p', function () { this.togglePause(); }.bind(this));
    // key('space', function () { this.game.jumper.bounce(); }.bind(this))
  };


})();
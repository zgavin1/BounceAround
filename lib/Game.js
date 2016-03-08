(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var Game = MyTrampoline.Game = function (jumperChoice) {
    this.jumper = {};
    this.trampoline = {};
    this.scoreKeeper = {};
    this.timer = {};
    this.coin = {};
    this.gameOver = false;

    var jumperChoiceTemporary = "beachGuy";

    this.addPieces(jumperChoiceTemporary);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;


  Game.prototype.addPieces = function(jumper) {
    this.addJumper(jumper);
    this.addTrampoline();
    this.addScoreKeeper();
    this.addCoin();
    setInterval(function () {
      this.addCoin();
    }.bind(this), 5000);

    this.startTimer();
  };

  // for when there are multiple jumpers
  Game.prototype.addJumper = function (jumper) {
    switch (jumper) {
      case "smallRed":
        this.jumper = new MyTrampoline.SmallRedJumper({ game: this, position: {x: 494, y: 290 }});
        break;
      case "beachGuy":
        this.jumper = new MyTrampoline.BeachGuyJumper({ game: this, position: {x: 485, y: 290 }});
        break;
    }
  };

  Game.prototype.startTimer = function() {
    this.timer = new MyTrampoline.Timer({ game: this });
  };


  Game.prototype.addScoreKeeper = function () {
    this.scoreKeeper = new MyTrampoline.ScoreKeeper({game: this, pos: [100, 200]});
  };

  Game.prototype.addCoin = function () {
    this.coin = new MyTrampoline.Coin({game: this});
  }

  Game.prototype.addTrampoline = function() {
    this.trampoline = new MyTrampoline.Trampoline({ game: this, pos: [100, 550] });
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.jumper.draw(ctx);
    this.trampoline.draw(ctx);
    this.scoreKeeper.draw(ctx);
    this.timer.draw(ctx);

    if (Object.keys(this.coin).length === 0) {
      return
    }
    this.coin.draw(ctx);
  };

  Game.prototype.drawGameOver = function(ctx) {
    this.draw(ctx);

    ctx.closePath();
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = "24px Comic Sans MS";

    var gameoverMessage = (this.jumper.isOutsideTramp ? "Ouch dude, you fell off the trampoline!" : "Nice job dude, great bouncing");
    ctx.fillText(
      gameoverMessage, Game.DIM_X / 2, Game.DIM_Y / 2 
    );
    ctx.fillText(
      "Click anywhere to play again", (Game.DIM_X / 2), (Game.DIM_Y / 2) + 30 
    );

    document.getElementById("canvas").onclick = function () {
      newGame();
    };
  };

  Game.prototype.reset = function() {
    this.addPieces();
  };

  Game.prototype.moveObjects = function () {
    this.jumper.move();
    this.trampoline.move();
  };

  Game.prototype.step = function() {
    if (this.timer.time === 0) {
      this.gameOver = true;
      return;
    }
    this.moveObjects();
    this.scoreKeeper.addToTotal();

    if (Object.keys(this.coin).length === 0) {
      return    
    }
    this.checkCoinGrab();
  };

  Game.prototype.checkBouncing = function () {
    return this.jumper.isBouncing(this.trampoline);
  };

  Game.prototype.checkCoinGrab = function() {
    if (this.coin.didGrabCoin(this.jumper)) {
      this.coin = {};
      this.scoreKeeper.addCoin();
    }
  };

})();
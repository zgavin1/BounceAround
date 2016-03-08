(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var ScoreKeeper = MyTrampoline.ScoreKeeper = function (attrs) {
  	this.game = attrs.game;
  	this.pos = attrs.pos;

  	this.total = 0;
  	this.grandCount = 0;
  	this.showBonus = false;
  	this.lastSpinDir = "";

  	setInterval(function () { this.showBonus = false;}.bind(this), 3000);
  }

  ScoreKeeper.prototype.draw = function(ctx) {
  	ctx.font="50px Charcoal";
    ctx.fillText("Score: " + this.total, this.pos[0] - 50, this.pos[1]);
    this.drawBonus(ctx, this.grandCount);
  };

  ScoreKeeper.prototype.addToTotal = function () {
  	var oldTotal = this.total;

    if (this.game.jumper.isRotating && !this.game.jumper.isCrouching()) {
      this.total += 5;
    }

    this.checkBonus(oldTotal);
  };

  ScoreKeeper.prototype.checkBonus = function(oldTotal) {
  	if (this.total - this.grandCount >= 1000 && oldTotal - this.grandCount < 1000) {
  		this.showBonus = true;
  		this.grandCount += 1000;
  	} 
  };

  ScoreKeeper.prototype.drawBonus = function (ctx, bonus) {
  	if (this.showBonus) {
	  	ctx.font = "80px Comic Sans MS";
	  	var colors = ["pink", "orange", "red", "white", "green"];
	  	var i = Math.floor(Math.random() * colors.length );
	  	ctx.fillStyle = colors[i];
	  	ctx.fillText(bonus + " Points!", 300, 200);
  	}
  };

  ScoreKeeper.prototype.addCoin = function() {
    this.total += 500;
    this.checkBonus();
  };



})();
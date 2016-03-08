(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Coin = MyTrampoline.Coin = function (attrs) {
  	this.game = attrs.game;

  	var coinSprite = new Image();
  	coinSprite.src = Coin.IMG_PATH;
  	this.posX = this.randomXCoord(),
  	this.posY = this.randomYCoord(),


  	this.spriteOptions = {
	  	img: coinSprite
  	};
  }

  Coin.HEIGHT = 40;
  Coin.WIDTH = 40;
  // Coin.STAGES = {
  // 	// stage: [startingHeigh, startingHorizontal, width, height]
  // 	1: [0, 0, 40, 40],
  // 	2: []
  // };
  Coin.IMG_PATH = "./assets/coin.png";

  Coin.prototype.randomXCoord = function(first_argument) {
  	var rand = Math.random();

  	return (rand * this.game.trampoline.width);
  };

  Coin.prototype.randomYCoord = function(first_argument) {
  	var rand = Math.random();
		return rand * this.game.trampoline.pos[1] / 1.2;
  };

  Coin.prototype.draw = function(ctx) {
  	ctx.drawImage(
  		this.spriteOptions.img,
  		0,
  		0,
  		48,
  		40,
  		this.posX,
  		this.posY,
  		40,
  		40
  	);
  };

  

  Coin.prototype.didGrabCoin = function(jumper) {
  	var jumperPos = jumper.position;
  	var jumperHeight = jumper.height;
  	var jumperWidth = jumper.width;

  	if (jumperPos.x <= this.posX + Coin.WIDTH && 
  			jumperPos.x + jumperWidth >= this.posX ) {
  		if (jumperPos.y <= this.posY + Coin.HEIGHT &&
  				jumperPos.y + jumperHeight >= this.posY) {
  			return true;
  		}
  	}
  	return false;
  };

})();
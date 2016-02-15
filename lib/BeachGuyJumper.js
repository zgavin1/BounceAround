(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var BeachGuyJumper = MyTrampoline.BeachGuyJumper = function (options) {

  	this.img = BeachGuyJumper.IMG;

  	this.spriteOptions = {
  		img: this.img,
  		normal: {
				subRectX: BeachGuyJumper.SPRITE_POS[0],
				subRectY: BeachGuyJumper.SPRITE_POS[1],
				subRectWidth: BeachGuyJumper.WIDTH,
				subRectHeight: BeachGuyJumper.HEIGHT
  		},
  		crouching: {
				subRectX: BeachGuyJumper.CROUCH_SPRITE_POS[0],
				subRectY: BeachGuyJumper.CROUCH_SPRITE_POS[1],
				subRectWidth: BeachGuyJumper.CROUCH_WIDTH,
				subRectHeight: BeachGuyJumper.CROUCH_HEIGHT
  		}
		}

  	MyTrampoline.Jumper.call(this, {
  		position: options.position,
  		game: options.game,
  		width: BeachGuyJumper.WIDTH,
  		height: BeachGuyJumper.HEIGHT,
  		speed: 0,
  		rotV: 0,
  		spriteOptions: this.spriteOptions
  	});
  	
  	// this.handleSprite();
  };

	// BeachGuyJumper.prototype.handleSprite = function () {
	// 	this.spriteOptions = {
	// 		img: this.img,
	// 		subRectX: BeachGuyJumper.SPRITE_POS[0],
	// 		subRectY: BeachGuyJumper.SPRITE_POS[1],
	// 		subRectWidth: BeachGuyJumper.WIDTH,
	// 		subRectWidth: BeachGuyJumper.HEIGHT
	// 	}
	// };

  BeachGuyJumper.HEIGHT = 80;
  BeachGuyJumper.WIDTH = 60;
  BeachGuyJumper.SPRITE_POS = [295, 328];

  BeachGuyJumper.CROUCH_HEIGHT = 48;
  BeachGuyJumper.CROUCH_WIDTH = 65;
  BeachGuyJumper.CROUCH_SPRITE_POS = [223,186];
  BeachGuyJumper.IMG = "./assets/beachguysprites.png";

  MyTrampoline.Util.inherits(BeachGuyJumper, MyTrampoline.Jumper);

})();
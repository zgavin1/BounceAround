(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Jumper = MyTrampoline.Jumper = function (options) {
    this.position = options.position;
    this.speed = options.speed;
    this.rotV = options.rotV;
    this.spriteOptions = options.spriteOptions
    this.speedX = 0;

    this.height = options.height;
    this.crouchHeight = options.height / 2;
    this.width = options.width;

    this.test = options.test;

    this.game = options.game;
    this.color = options.color;
    this.isCrouched = false;
    this.isRotating = false;
    this.isOutsideTramp = false;

    document.addEventListener("keyup", function (e) {
      e.preventDefault();
      
      if (e.keyCode === 32 && this.isBouncing(this.game.trampoline)) {
        this.speed = Math.abs(this.speed * 2);
        this.pos += this.height;
      }
    }.bind(this));
  };

  Jumper.prototype.draw = function(ctx) {

    this.handleCtx(ctx, this.position, 1);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (this.position.y < 0) {
      this.drawSkyCam(ctx);
    }
  };

  Jumper.prototype.drawSkyCam = function(ctx) {
    var skyCamPosition = {x: 850, y: 310};
    ctx.fillStyle = "blue"
    ctx.beginPath();
    ctx.rect(
      770, 250, 200, 180
    );
    ctx.stroke();

    this.handleCtx(ctx, skyCamPosition, 1.5);
    // ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = "bold italic 30px Arial";
    ctx.fillText("SkyCam", 810, 240);
    ctx.font = "14px Arial";
    ctx.fillText("Altitude: " + Math.ceil(Math.abs(this.position.y - 550)), 830, 420); 

  };

  Jumper.prototype.handleCtx = function(ctx, position, sizeMultiplier) {
    var realHeight = this.height
    if (this.isCrouching()) {
      realHeight = this.crouchHeight;
    }

    var rot = this.rotV;
    if (this.rotV < 0 && this.isRotating) {
      this.rotV -= .1;
    } else if (this.rotV > 0 && this.isRotating) {
      this.rotV += .1;
    }

    ctx.translate(position.x + (this.width / 2), position.y + (realHeight / 2));
    ctx.rotate(rot);

    if (this.spriteOptions) {
      this.drawSprite(ctx);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(
        -(this.width / 2) * sizeMultiplier,
        -(realHeight / 2) * sizeMultiplier,
        this.width * sizeMultiplier,
        realHeight * sizeMultiplier
      );
      ctx.fill();  
    }

  };

  Jumper.prototype.drawSprite = function(ctx) {
    var whichSprite = (this.isCrouching() ? this.spriteOptions.crouching : this.spriteOptions.normal );
    ctx.drawImage(
      resources.get(this.spriteOptions.img),
      whichSprite.subRectX,
      whichSprite.subRectY,
      whichSprite.subRectWidth,
      whichSprite.subRectHeight,
      -(this.width / 2),
      -(this.height / 2),
      this.width,
      this.height
    );
  };

  Jumper.prototype.isBouncing = function(trampoline) {
    var realHeight = this.height;
    if (this.isCrouching()) {
      realHeight = this.crouchHeight;
    }

    return (this.position.y + realHeight > trampoline.pos[1] + 20);
  };

  Jumper.prototype.isCrouching = function() {
    return key.isPressed("space");
  };

  Jumper.prototype.move = function() {
    if (!this.isBouncing(this.game.trampoline)) {
      this.speed -= MyTrampoline.Util.gravity;
    } else if (this.isBouncing(this.game.trampoline) && this.isOutsideTramp) {
      this.bounce(.1);
      this.game.gameOver = true;
      return
    } else if (this.isBouncing(this.game.trampoline)) {
      this.bounce(.75);
    }

    this.position.y -= this.speed;
    this.position.x += this.speedX;

    if (this.position.x > this.game.trampoline.pos[0] + this.game.trampoline.width || 
        this.position.x + this.width < this.game.trampoline.pos[0]) {
      this.isOutsideTramp = true;
    }
  };

  Jumper.prototype.bounce = function(multiplier) {

    this.speed = Math.abs(this.speed * multiplier);
    if (this.rotV !== 0) {
      this.rotV > 0 ? this.speedX += 1 : this.speedX -= 1;
    }

    this.rotV = 0;
    this.isRotating = false;
    if (this.speed < 8) {
      this.speed = 8;
    }
  };

  Jumper.prototype.toggleCrouched = function () {
    this.crouched = !this.crouched;
  };

  Jumper.prototype.powerSpin = function (dir) {
    if ( (dir > 0 && this.rotV < 0) || (dir < 0 && this.rotV > 0)) {
      this.rotV = 0;
      this.isRotating = false;
    } else {
      this.rotV += .1 * dir;
      this.isRotating = true;
    }
  };

})();
(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Jumper = MyTrampoline.Jumper = function (options) {
    this.position = options.position;
    this.speed = options.speed;
    this.rotV = options.rotV;

    this.height = options.height;
    this.crouchHeight = options.height / 2;
    this.width = options.width;

    this.test = options.test;

    this.game = options.game;
    this.color = options.color;
    this.isCrouched = false;
    this.isRotating = false;
    this.bounceChance = true;
    this.bounceInterval;
  };

  Jumper.prototype.draw = function(ctx) {
    // var realHeight = this.height
    // if (this.isCrouching()) {
    //   realHeight = this.crouchHeight;
    // }

    // var rot = this.rotV;
    // if (this.rotV < 0 && this.isRotating) {
    //   this.rotV -= .1;
    // } else if (this.rotV > 0 && this.isRotating) {
    //   this.rotV += .1;
    // }

    this.handleCtx(ctx, this.position, 1);

    // ctx.translate(this.position.x + (this.width / 2), this.position.y + (realHeight / 2));
    // ctx.rotate(rot);
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.fillRect(
    //   -(this.width / 2), -(realHeight / 2), this.width, realHeight
    // );
    ctx.fill();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (this.position.y < 0) {
      this.drawSkyCam(ctx);
    }
  };

  Jumper.prototype.drawSkyCam = function(ctx) {
    var skyCamPosition = {x: 840, y: 320};
    ctx.fillStyle = "blue"
    ctx.beginPath();
    ctx.rect(
      750, 250, 200, 180
    );
    ctx.fill();

    this.handleCtx(ctx, skyCamPosition, 1.5);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "white";
    ctx.font = "bold italic 30px Arial";
    ctx.fillText("SkyCam", 800, 240);
    ctx.font = "14px Arial";
    ctx.fillText("Altitude: " + Math.ceil(Math.abs(this.position.y - 550)), 810, 420); 

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
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(
      -(this.width / 2) * sizeMultiplier,
      -(realHeight / 2) * sizeMultiplier,
      this.width * sizeMultiplier,
      realHeight * sizeMultiplier
    );
  };

  Jumper.prototype.isBouncing = function(trampoline) {
    var realHeight = this.height;
    if (this.isCrouching()) {
      // debugger
      realHeight = this.crouchHeight;
    }

    return (this.position.y + realHeight > trampoline.pos[1] + 10); //&& (this.position.y <= trampoline.pos[1] - 1);
  };

  Jumper.prototype.endBounceChance = function() {
    clearInterval(this.bounceInterval);
    this.bounceChance = false;
  };

  Jumper.prototype.isCrouching = function() {
    return key.isPressed("space");
  };

  Jumper.prototype.move = function() {
    if (!this.isBouncing(this.game.trampoline)) {
      this.speed -= MyTrampoline.Util.gravity;
    } else if (this.isCrouching()) {
      this.bounce(1.15);
    } else {
      this.bounce(.75);
    }

    this.position.y -= this.speed;
  };

  Jumper.prototype.bounce = function(multiplier) {
    this.speed = Math.abs(this.speed * multiplier);
    this.rotV = 0;
    this.isRotating = false;
    if (this.speed < 5) {
      this.speed = 5;
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

  // Jumper.prototype.spin = function (ctx) {

  // }





})();
(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Jumper = MyTrampoline.Jumper = function (options) {
    this.position = options.position;
    this.speed = options.speed;
    this.rotV = options.rotV;

    this.height = options.height;
    this.width = options.width;

    this.test = options.test

    this.game = options.game
    this.color = options.color;
    this.isCrouched = false;
    this.isRotating = false;
  };

  Jumper.prototype.draw = function(ctx) {
    var realHeight = this.height
    if (this.isCrouching()) {
      realHeight /= 2;
    }
    var rot = this.rotV;
    ctx.translate(this.position.x + this.width / 2, this.position.y + realHeight / 2);
    ctx.rotate(rot);
    // this.rotV += .1;
    // ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      // 0, 0, this.width, realHeight
      
      0, 0, this.width, realHeight
    );
    ctx.fill();

    // ctx.rotate(this.rotV)
    ctx.setTransform(1, 0, 0, 1, 0, 0);


  };

  Jumper.prototype.isBouncing = function(trampoline) {
    // return this.position.y >= 525;
    return this.position.y >= trampoline.pos[1] - 15 //&& (this.position.y <= trampoline.pos[1] - 1);
  };

  Jumper.prototype.isCrouching = function() {
    return key.isPressed("space");
  };

  Jumper.prototype.move = function() {
    if (!this.isBouncing(this.game.trampoline)) {
      this.speed -= MyTrampoline.Util.gravity;
    } else if (this.isCrouching() && this.isBouncing(this.game.trampoline)) {
      this.speed += MyTrampoline.Util.trampolineForce * 5;
    // } else if (this.isBouncing(this.game.trampoline)) {
    //   this.speed += MyTrampoline.Util.trampolineForce;
    } else {
      this.bounce();
    }
    this.position.y -= this.speed;
  };

  Jumper.prototype.bounce = function() {
    this.speed = Math.abs(this.speed * .9);
    this.rotV = 0;
    this.isRotating = false;
    // this.speed += MyTrampoline.Util.trampolineForce;
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

  Jumper.prototype.spin = function (ctx) {

  }





})();
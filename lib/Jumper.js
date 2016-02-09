(function () {
  if (typeof Trampoline === "undefined") {
    window.Trampoline = {};
  }

  var Jumper = Trampoline.Jumper = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.rotV = options.rotV;

    this.height = options.height;
    this.width = options.width;


    this.color = options.color;
    this.game = options.game;
  };

  Jumper.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.fillRect(
      this.pos[0], this.pos[1], this.height, this.width
    );
    ctx.fill();
  };

  Jumper.prototype.isBouncing = function(trampoline) {
    this.pos[1] > trampoline.height;
  };



})();
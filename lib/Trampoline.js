(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Trampoline = MyTrampoline.Trampoline = function (attrs) {
    this.game = attrs.game;
    this.pos = attrs.pos;
    this.height = Trampoline.HEIGHT;
    this.width = Trampoline.WIDTH;
    this.color = Trampoline.COLOR;

    this.speed = 0
  }

  Trampoline.HEIGHT = 200;
  Trampoline.WIDTH = 800;
  Trampoline.COLOR = "black";

  Trampoline.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      this.pos[0], this.pos[1], this.width, this.height
    );

    ctx.fill();
  };


  Trampoline.prototype.move = function() {

    if ((this.pos[1] <= this.game.jumper.position.y + this.game.jumper.height) && (this.pos[1] < 600)) {
      if (this.speed < 5) {
        this.speed -= .1 * this.game.jumper.speed;
      }
    } else if (this.pos[1] > this.game.jumper.position.y + this.game.jumper.height) {
      if (this.pos[1] > 550.5) {
        this.speed = -(.2 * (this.pos[1] - 550));
      } else if (this.pos[1] < 549.5) {
        this.speed = .2 * (550 - this.pos[1]);
      }
    }
    if (this.speed > 3) {
      this.speed = 3;
    } else if (this.speed < -3) {
      this.speed = -3;
    }

    this.pos[1] += this.speed;

    if (Math.abs(this.pos[1] - 550) >= 40) {
      this.speed = -(.1 * (this.pos[1] - 550));
    }

  };

})();
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
    this.depth = 25;

    this.speed = 0
  }

  Trampoline.HEIGHT = 10;
  Trampoline.WIDTH = 800;
  Trampoline.COLOR = "black";

  Trampoline.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.fillRect(
      this.pos[0], this.pos[1], this.width, this.height
    );

    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1] + this.height);
    ctx.lineTo(this.pos[0] + this.width, this.pos[1] + this.height);
    ctx.lineTo(this.game.jumper.position.x + (this.game.jumper.width / 2), this.pos[1] + this.depth);
    ctx.fill();

  };


  Trampoline.prototype.move = function() {

    var fullDepth = this.pos[1] + this.depth;
    var jumperBottom = this.game.jumper.position.y + this.game.jumper.height;

    if (fullDepth <= jumperBottom) {
      if (this.speed < 5) {
        this.speed -= .2 * this.game.jumper.speed;
      }
    } else if (fullDepth > jumperBottom) {
      if (fullDepth > 550.5) {
        this.speed = -(.2 * (fullDepth - 550));
      } else if (fullDepth < 549.5) {
        this.speed = .2 * (550 - (fullDepth));
      }
    }

    if (this.speed > 3) {
      this.speed = 3;
    } else if (this.speed < -3) {
      this.speed = -3;
    } 

    this.depth += this.speed;

    if (Math.abs(fullDepth - 550) >= 40) {
      this.speed = -(.1 * (fullDepth - 550));
    }


    // if ((this.depth + this.pos[1] <= this.game.jumper.position.y + this.game.jumper.height) && (this.depth < 600)) {
    //   if (this.speed < 5) {
    //     this.speed -= .1 * this.game.jumper.speed;
    //   }
    // } else if (this.pos[1] + this.depth > this.game.jumper.position.y + this.game.jumper.height) {
    //   if (this.pos[1] + this.depth> 550.5) {
    //     this.speed = -(.2 * (this.depth - 550));
    //   } else if (this.pos[1] + this.depth < 549.5) {
    //     this.speed = .2 * (550 - (this.pos[1] + this.depth));
    //   }
    // }
    // if (this.speed > 3) {
    //   this.speed = 3;
    // } else if (this.speed < -3) {
    //   this.speed = -3;
    // }

    // this.depth += this.speed;

    // if (Math.abs(this.pos[1] - 550) >= 40) {
    //   this.speed = -(.1 * (this.depth - 550));
    // }

  };

})();
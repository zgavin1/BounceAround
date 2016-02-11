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

  Trampoline.HEIGHT = 50;
  Trampoline.WIDTH = 500;
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
    if (this.game.checkBouncing()) {
      this.speed += MyTrampoline.Util.trampolineTension;
    } else {
      if (this.pos[1] > 550.4) {
        this.speed = (this.speed - .3 * (this.pos[1] - 550 ));
      } else if (this.pos[1] < 549.6) {
        this.speed = (this.speed + .3 * (550 - this.pos[1])) ;
      } else {
        this.speed = 0;
      }
    }

    this.pos[1] += this.speed;
  };

  // Trampoline.prototype.isBouncing = function() {
  //   if (this.game.jumper.position.y >= this.pos[0]) {
  //     this.pos[0] == this
  //   } 
  // };

  Trampoline.prototype.bounce = function() {
    this.isBouncing = true;
  };

  // Trampoline.prototype.rebound = function(first_argument) {
  //   while (this.pos[1] > 550) {
  //     this.pos[1] -= 1;
  //   }
  // };

})();
(function () {
  if (typeof Trampoline === "undefined") {
    window.Trampoline = {};
  }

  var SmallRedJumper = Trampoline.SmallRedJumper = function (attrs) {

  	attrs.color = SmallRedJumper.COLOR;
  	attrs.height = SmallRedJumper.HEIGHT;
  	attrs.width = SmallRedJumper.WIDTH;

  	attrs.pos;
  	attrs.vel;
  	attrs.rotV;

  	Trampoline.Jumper.call(this, options);
  }

  SmallRedJumper.COLOR = 'red';
  SmallRedJumper.HEIGHT = 20;
  SmallRedJumper.WIDTH = 12;

  Asteroids.Util.inherits(SmallRedJumper, Asteroids.Jumper);



})();
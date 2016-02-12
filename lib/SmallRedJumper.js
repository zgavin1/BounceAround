(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var SmallRedJumper = MyTrampoline.SmallRedJumper = function (attrs) {

  	MyTrampoline.Jumper.call(this, {
  		position: attrs.position,
  		game: attrs.game,
  		color: SmallRedJumper.COLOR,
  		height: SmallRedJumper.HEIGHT,
  		width: SmallRedJumper.WIDTH,
  		speed: 0,
  		rotV: 0,
  		test: attrs.test
  	});
  }

  SmallRedJumper.COLOR = 'red';
  SmallRedJumper.HEIGHT = 40;
  SmallRedJumper.WIDTH = 20;

  MyTrampoline.Util.inherits(SmallRedJumper, MyTrampoline.Jumper);

})();

(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Coin = MyTrampoline.Coin = function (attrs) {
  	this.game = attrs.game;


  }

  Coin.HEIGHT = 40;
  Coin.WIDTH = 40;

  Coin.prototype.draw = function(ctx) {
  	
  };

  Coin.prototype.move = function(first_argument) {
  	// body...
  };


})();
(function () {
  if (typeof Trampoline === "undefined") {
    window.Trampoline = {};
  };

  var GameView = Trampoline.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = document.getElementByTagName;
  };

  GameView.prototype.start = function() {
    setInterval(this.game.moveObjects, 20)
  };


})();
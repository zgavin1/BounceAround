(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  };

  var Timer = MyTrampoline.Timer = function () {
  	this.time = 60;
  	this.pos = [800, 120];

  	this.intId = setInterval(this.countdown.bind(this), 1000);
  }

  Timer.prototype.draw = function(ctx) {
  	var timeDisplay = "";
  	ctx.fillStyle = "black";

  	var shakeX = 0;
  	var shakeY = 0;
  	if (this.time === 60) {
  		timeDisplay = "1:00";
  	} else if (this.time < 10) {
  		shakeX = Math.floor(Math.random() * 5 );
  		shakeY = Math.floor(Math.random() * 5 );
  		ctx.fillStyle = "red"
  		timeDisplay = ":0" + this.time;
  	} else {
  		timeDisplay = ":" + this.time;
  	}


  	ctx.font="60px Charcoal";

    ctx.fillText(timeDisplay, this.pos[0] + shakeX, this.pos[1] + shakeY);
  };

  Timer.prototype.countdown = function() {
  	this.time -= 1;
  	if (this.time === 0) {
      clearInterval(this.intId)
    }
  };

})();
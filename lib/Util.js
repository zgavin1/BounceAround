(function () {
  if (typeof MyTrampoline === "undefined") {
    window.MyTrampoline = {};
  }

  var Util = MyTrampoline.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass; // unsure about this.
  };


  Util.gravity = .1;

  Util.trampolineForce = -1;

  Util.trampolineTension = 1.6

})();
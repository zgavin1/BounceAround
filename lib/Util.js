(function () {
  if (typeof Trampoline === "undefined") {
    window.Trampoline = {};
  }

  var Util = Trampoline.Util = function (args) {

  };

  Util.prototype.inherits = function(ChildClass, ParentClass) {
    var Surrogate = function (){};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    // ChildClass.prototype.constructor = ChildClass; // unsure about this.

  };


})();
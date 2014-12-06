var add = require('vectors/add')(2)
var copy = require('vectors/copy')(2)

function World() {
  if (!(this instanceof World)) return new World()
  this.entities = []
  window.onresize = this.onresize.bind(this)
  this.onresize()
}
module.exports = World

World.prototype.render = function() {
  for (var i = 0; i < this.entities.length; i++) {
    this.entities[i].render(this)
  }
}

World.prototype.onresize = function() {
  this.width = window.innerWidth
  this.height = window.innerHeight
  this.center = [this.width / 2, this.height / 2]
}

World.prototype.fromCenter = function(pos) {
  var res = copy(this.center)
  add(res, pos)
  return res
}


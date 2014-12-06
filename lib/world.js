var rand = require('./common').rand

function World() {
  if (!(this instanceof World)) return new World()
  this.entities = []
  this.entityTypes = {
    player: require('./player'),
    snowflake: require('./snowflake'),
  }
  window.onresize = this.onresize.bind(this)
  this.onresize()
}
module.exports = World

World.prototype.tick = function() {
  var i = this.entities.length
  while (i--) {
    var entity = this.entities[i]
    if (entity.dead) {
      this.entities.splice(i, 1)
      if (entity.element) entity.element.remove()
    } else {
      entity.tick(this)
    }
  }
}

World.prototype.onresize = function() {
  this.width = window.innerWidth
  this.height = window.innerHeight
  this.center = [this.width / 2, this.height / 2]
}

World.prototype.fromCenter = function(pos) {
  return [this.center[0] + pos[0], this.center[1] + pos[1]]
}

World.prototype.spawnEntity = function(type, pos) {
  var self = this
  var e = new (self.entityTypes[type])
  e.position = pos || [0,0]
  self.entities.push(e)
  e.create()
  return e
}

World.prototype.spawnEntityRandom = function(type, origin, dist) {
  origin = origin || [0,0]
  dist = dist || [50,50]
  return this.spawnEntity(type, [
    origin[0] + rand(-dist[0], dist[0]),
    origin[1] + rand(-dist[1], dist[1]),
  ])
}

World.prototype.randomEnemy = function(chance) {
  // TODO: Random enemy encounter
}

var inherits = require('util').inherits
var _ = require('lodash')
var Entity = require('./entity')
var Snowflake = require('./snowflake')

function Player() {
  if (!(this instanceof Player)) return new Player()
  Entity.call(this)
  this.id = 'player'
  this.char = '☃'
  this.hp = 100
  this.inv = {
    snowflakes: 0,
  }
  this.collecting = false
}
inherits(Player, Entity)
module.exports = Player

Player.prototype.tick = function(world) {
  Entity.prototype.tick.call(this, world)
  this.onSnowflake(world)
}

Player.prototype.onSnowflake = _.throttle(function(world) {
  for (var i = 0; i < world.entities.length; i++) {
    var entity = world.entities[i]
    if (!(entity instanceof Snowflake)) continue
    var delta = [
      Math.abs(this.position[0] - entity.position[0]),
      Math.abs(this.position[1] - entity.position[1]),
    ]
    if (delta[0] <= this.size[0] && delta[1] <= this.size[1]) {
      this.inv.snowflakes++
      entity.kill()
    }
  }
}, 10)

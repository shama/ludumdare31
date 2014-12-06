var inherits = require('util').inherits
var Entity = require('./entity')

function Player(id) {
  if (!(this instanceof Player)) return new Player(id)
  Entity.call(this, id)
  this.id = 'player'
  this.char = '☃'
}
inherits(Player, Entity)
module.exports = Player

//Player.prototype.render = function() {}

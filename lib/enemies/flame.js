var inherits = require('util').inherits
var Enemy = require('./enemy')

function Flame() {
  if (!(this instanceof Flame)) return new Flame()
  var self = this
  Enemy.call(this)
  this.name = 'FLAME'
  this.hp = 3
  this.str = 1
  this.def = 0
  this.run = .1
  this.snowflakes = 5
}
inherits(Flame, Enemy)
module.exports = Flame

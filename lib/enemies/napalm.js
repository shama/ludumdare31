var inherits = require('util').inherits
var Enemy = require('./enemy')

function Napalm() {
  if (!(this instanceof Napalm)) return new Napalm()
  var self = this
  Enemy.call(this)
  this.name = 'NAPALM'
  this.hp = 100
  this.str = 23
  this.def = 15
  this.run = .5
  this.snowflakes = 200
}
inherits(Napalm, Enemy)
module.exports = Napalm

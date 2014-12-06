var inherits = require('util').inherits
var Enemy = require('./enemy')

function Napalm() {
  if (!(this instanceof Napalm)) return new Napalm()
  var self = this
  Enemy.call(this)
  this.name = 'NAPALM'
  this.hp = 100
  this.str = 20
  this.def = 50
  this.run = .75
  this.snowflakes = 200
}
inherits(Napalm, Enemy)
module.exports = Napalm

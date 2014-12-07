var inherits = require('util').inherits
var Enemy = require('./enemy')

function Sun() {
  if (!(this instanceof Sun)) return new Sun()
  var self = this
  Enemy.call(this)
  this.name = '☀SUN☀'
  this.hp = 9999
  this.str = 45
  this.def = 45
  this.run = 1
  this.snowflakes = 9999
}
inherits(Sun, Enemy)
module.exports = Sun

var inherits = require('util').inherits
var Enemy = require('./enemy')

function Sun() {
  if (!(this instanceof Sun)) return new Sun()
  var self = this
  Enemy.call(this)
  this.name = '☀SUN☀'
  this.hp = 9999
  this.str = 100
  this.def = 1000
  this.run = 1
  this.snowflakes = 9999
}
inherits(Sun, Enemy)
module.exports = Sun

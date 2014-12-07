var inherits = require('util').inherits
var Enemy = require('./enemy')

function Fire() {
  if (!(this instanceof Fire)) return new Fire()
  var self = this
  Enemy.call(this)
  this.name = 'FIRE'
  this.hp = 20
  this.str = 6
  this.def = 5
  this.run = .3
  this.snowflakes = 50
}
inherits(Fire, Enemy)
module.exports = Fire

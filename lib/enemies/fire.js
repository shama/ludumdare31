var inherits = require('util').inherits
var Enemy = require('./enemy')

function Fire() {
  if (!(this instanceof Fire)) return new Fire()
  var self = this
  Enemy.call(this)
  this.name = 'FIRE'
  this.hp = 20
  this.str = 5
  this.def = 10
  this.run = .5
  this.snowflakes = 50
}
inherits(Fire, Enemy)
module.exports = Fire

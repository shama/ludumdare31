var inherits = require('util').inherits
var Item = require('./item')

function SnoMachine() {
  if (!(this instanceof SnoMachine)) return new SnoMachine()
  var self = this
  Item.call(this)
  this.id = 'snomachine'
  this.name = 'SNO™ MACHINE'
  this.type = 'thing'
  this.cost = 1
  this.holdable = false
}
inherits(SnoMachine, Item)
module.exports = SnoMachine

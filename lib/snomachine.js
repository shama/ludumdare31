var inherits = require('util').inherits
var Entity = require('./entity')
var tic = require('./common').tic

function SnoMachine() {
  if (!(this instanceof SnoMachine)) return new SnoMachine()
  var self = this
  Entity.call(this)
  this.amt = 10
  this.char = this.amt
  this.clearInterval = tic.interval(function() {
    self.emit()
  }, 10 * 1000)
  this.onemit = function() {}
}
inherits(SnoMachine, Entity)
module.exports = SnoMachine

SnoMachine.prototype.emit = function() {
  if (this.dead) return
  this.amt--
  this.element.innerHTML = this.amt
  this.onemit()
  if (this.amt < 1) {
    this.clearInterval()
    this.kill()
  }
}

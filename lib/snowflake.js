var inherits = require('util').inherits
var Entity = require('./entity')
var rand = require('./common').rand
var tic = require('./common').tic

function Snowflake() {
  if (!(this instanceof Snowflake)) return new Snowflake()
  var self = this
  Entity.call(this)
  this.id = 'snowflake'
  this.char = '❄'
  this.lifespan = 10000
  // Kill after lifespan, delayed to allow changing lifespan
  var lifespanDt = this.lifespan / 10
  tic.setTimeout(function() {
    tic.timeout(function() {
      self.kill()
    }, rand(self.lifespan - lifespanDt, self.lifespan + lifespanDt))
  }, 100)
}
inherits(Snowflake, Entity)
module.exports = Snowflake

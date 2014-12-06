var inherits = require('util').inherits
var Entity = require('./entity')
var rand = require('./common').rand
var tic = require('./common').tic

function Snowflake() {
  if (!(this instanceof Snowflake)) return new Snowflake()
  Entity.call(this)
  this.id = 'snowflake'
  this.char = '❄'
  // Kill after 10s
  tic.timeout(this.kill.bind(this), 10000)
}
inherits(Snowflake, Entity)
module.exports = Snowflake

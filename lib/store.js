var inherits = require('util').inherits
var Entity = require('./entity')
var tic = require('./common').tic

function Store() {
  if (!(this instanceof Store)) return new Store()
  var self = this
  Entity.call(this)
  this.id = 'store'
  this.char = '☆'
}
inherits(Store, Entity)
module.exports = Store

Store.prototype.buy = function(player, item) {
  // Does player own it already?
  if (player.inv[item.id]) {
    // Yes, then equip
    player.equip[item.type] = item.id
    this.flash('rgba(255, 255, 0, .5)')
    return
  }
  // Can the player afford it?
  if (player.inv.snowflakes >= item.cost) {
    // Yes, then buy and equip it
    player.inv.snowflakes -= item.cost
    player.inv[item.id] = item
    player.equip[item.type] = item.id
    this.flash('rgba(0, 255, 0, .5)')
    return
  }
  this.flash('rgba(255, 0, 0, .5)')
}

Store.prototype.flash = function(color, time) {
  time = time || 500
  var oldColor = document.getElementById('store').style.backgroundColor
  document.getElementById('store').style.backgroundColor = color
  tic.timeout(function() {
    document.getElementById('store').style.backgroundColor = oldColor
  }, time)
}
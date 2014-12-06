var inherits = require('util').inherits
var Entity = require('./entity')
var tic = require('./common').tic
var flash = require('./common').flash

function Store() {
  if (!(this instanceof Store)) return new Store()
  var self = this
  Entity.call(this)
  this.id = 'store'
  this.char = '$'
}
inherits(Store, Entity)
module.exports = Store

Store.prototype.buy = function(player, item) {
  // Does player own it already?
  if (player.inv[item.id]) {
    // Yes, then equip (or remove if a !holdable item snuck into inv)
    if (!item.holdable) {
      delete player.inv[item.id]
    } else {
      player.equip[item.type] = item.id
    }
    flash(this.id, 'rgba(255, 255, 0, .5)')
    return false
  }
  // Can the player afford it?
  if (player.inv.snowflakes >= item.cost) {
    // Yes, then buy and equip it if we can
    player.inv.snowflakes -= item.cost
    if (item.holdable) {
      player.inv[item.id] = item
      player.equip[item.type] = item.id
    }
    flash(this.id, 'rgba(0, 255, 0, .5)')
    return true
  }
  flash(this.id, 'rgba(255, 0, 0, .5)')
  return false
}

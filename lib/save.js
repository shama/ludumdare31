var localstore = require('local-store')()

module.exports.save = function(player) {
  localstore.set('save', {
    player: player.toObject(),
  })
}

module.exports.restore = function(player, world) {
  var saved = localstore.get('save')
  if (saved) {
    Object.keys(saved.player.inv).forEach(function(key) {
      if (key === 'snowflakes') {
        player.inv[key] = saved.player.inv[key]
      } else if (world.items[key]) {
        player.inv[key] = world.items[key]
      }
    })
    if (saved.player.hp) player.hp = saved.player.hp
    if (saved.player.equip) player.equip = saved.player.equip
  }
}

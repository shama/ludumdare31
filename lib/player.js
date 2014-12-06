var inherits = require('util').inherits
var _ = require('lodash')
var Entity = require('./entity')
var Snowflake = require('./snowflake')
var Store = require('./store')
var flash = require('./common').flash

function Player() {
  if (!(this instanceof Player)) return new Player()
  Entity.call(this)
  this.id = 'player'
  this.char = '☃'
  this.reset()
  this.canShop = false
  this.defineStats()
  this.ondead = function() {}
}
inherits(Player, Entity)
module.exports = Player

Player.prototype.reset = function() {
  this.hp = 100
  this.maxhp = 100
  this.inv = {
    snowflakes: 0,
  }
  this.equip = {
    weapon: null,
    armor: null,
  }
}

Player.prototype.tick = function(world) {
  Entity.prototype.tick.call(this, world)
  this.whereAmI(world)
}

Player.prototype.defineStats = function() {
  var self = this
  Object.defineProperty(self, 'str', {
    get: function() {
      if (self.equip.weapon && self.inv[self.equip.weapon] && self.inv[self.equip.weapon].str) {
        return self.inv[self.equip.weapon].str
      }
      return 0
    }
  })
  Object.defineProperty(self, 'def', {
    get: function() {
      if (self.equip.armor && self.inv[self.equip.armor] && self.inv[self.equip.armor].def) {
        return self.inv[self.equip.armor].def
      }
      return 0
    }
  })
}

Player.prototype.whereAmI = _.throttle(function(world) {
  this.canShop = false
  for (var i = 0; i < world.entities.length; i++) {
    var entity = world.entities[i]
    var delta = [
      Math.abs(this.position[0] - entity.position[0]),
      Math.abs(this.position[1] - entity.position[1]),
    ]
    if (delta[0] <= this.size[0] && delta[1] <= this.size[1]) {
      if (entity instanceof Snowflake) this.onSnowflake(entity)
      else if (entity instanceof Store) this.onStore(entity)
    }
  }
}, 10)

Player.prototype.attack = function(enemy) {
  var amt = this.str - enemy.def
  if (amt < 0) amt = 0
  enemy.hit(this, amt)
}

Player.prototype.run = function(enemy) {
  if (enemy.canRun(this)) {
    this.canMove = true
    enemy.kill()
  }
}

Player.prototype.hit = function(enemy, amt) {
  this.hp -= amt
  if (this.hp <= 0) {
    this.canMove = false
    this.ondead()
  }
}

Player.prototype.onSnowflake = function(entity) {
  this.inv.snowflakes++
  if (this.hp < this.maxhp) {
    this.hp++
  }
  entity.kill()
}

Player.prototype.onStore = function(entity) {
  this.canShop = true
}

Player.prototype.toObject = function() {
  var self = this
  var inv = Object.create(null)
  Object.keys(self.inv).forEach(function(key) {
    if (key === 'snowflakes') inv[key] = self.inv[key]
    else inv[key] = true
  })
  return {
    hp: this.hp,
    inv: inv,
    equip: this.equip,
  }
}

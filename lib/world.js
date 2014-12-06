var _ = require('lodash')
var rand = require('./common').rand
var createMenuItem = require('./common').createMenuItem
var Item = require('./items/item')
var SnoMachine = require('./items/snomachine')

function World() {
  if (!(this instanceof World)) return new World()
  this.entities = []
  this.entityTypes = {
    player: require('./player'),
    store: require('./store'),
    snowflake: require('./snowflake'),
    snomachine: require('./snomachine'),
    'enemy-flame': require('./enemies/flame'),
    'enemy-fire': require('./enemies/fire'),
    'enemy-napalm': require('./enemies/napalm'),
    'enemy-sun': require('./enemies/sun'),
  }
  this.items = {}
  this.addItemsToStore()
  this.onbuy = function() {}
  window.onresize = this.onresize.bind(this)
  this.onresize()
}
module.exports = World

World.prototype.tick = function() {
  var i = this.entities.length
  while (i--) {
    var entity = this.entities[i]
    if (entity.dead) {
      this.entities.splice(i, 1)
      if (entity.element) entity.element.remove()
    } else {
      entity.tick(this)
    }
  }
}

World.prototype.onresize = function() {
  this.width = window.innerWidth
  this.height = window.innerHeight
  this.center = [this.width / 2, this.height / 2]
}

World.prototype.fromCenter = function(pos) {
  return [this.center[0] + pos[0], this.center[1] + pos[1]]
}

World.prototype.spawnEntity = function(type, pos) {
  var self = this
  var e = new (self.entityTypes[type])
  e.position = pos || [0,0]
  self.entities.push(e)
  e.create()
  return e
}

World.prototype.spawnEntityRandom = function(type, origin, dist) {
  origin = origin || [0,0]
  dist = dist || [50,50]
  return this.spawnEntity(type, [
    origin[0] + rand(-dist[0], dist[0]),
    origin[1] + rand(-dist[1], dist[1]),
  ])
}

World.prototype.randomEnemy = _.throttle(function(pos, player) {
  var probability = 1
  var enemy = 'flame'
  var delta = (Math.abs(pos[0]) + Math.abs(pos[1])) / 2
  if (delta >= 100 && delta < 200) {
    probability = .95
  } else if (delta >= 200 && delta < 300) {
    enemy = 'fire'
    probability = .9
  } else if (delta >= 300 && delta < 400) {
    enemy = 'napalm'
    probability = .75
  } else if (delta >= 400 && delta < 500) {
    enemy = 'sun'
    probability = .5
  } else if (delta >= 500 && delta < 600) {
    enemy = 'sun'
    probability = .4
  } else if (delta >= 600) {
    enemy = 'sun'
    probability = 0
  }
  var r = Math.random()
  if (r > probability) {
    var e = this.spawnEntity('enemy-' + enemy, [pos[0], pos[1] - 20])
    e.fight(player)
  }
}, 100)

World.prototype.addItemsToStore = function() {
  var self = this
  
  self.items.coldfist = new Item({ str: 1, name: 'COLDFIST', id: 'coldfist', cost: 0 })
  self.items.icicle = new Item({ str: 5, name: 'ICICLE', id: 'icicle', cost: 10 })
  self.items.icyknife = new Item({ str: 20, name: 'ICY KNIFE', id: 'icyknife', cost: 50 })
  self.items.frostsword = new Item({ str: 50, name: 'FROST SWORD', id: 'frostsword', cost: 100 })

  self.items.snow = new Item({ def: 1, name: 'SNOW', id: 'snow', cost: 0, type: 'armor' })
  self.items.ice = new Item({ def: 5, name: 'ICE', id: 'ice', cost: 10, type: 'armor' })
  self.items.frost = new Item({ def: 20, name: 'FROST', id: 'frost', cost: 50, type: 'armor' })
  self.items.tundra = new Item({ def: 50, name: 'TUNDRA', id: 'tundra', cost: 100, type: 'armor' })

  self.items.snomachine = new SnoMachine()

  var store = document.getElementById('store')
  Object.keys(self.items).forEach(function(key) {
    var item = self.items[key]
    var li = createMenuItem(item.name + '(' + item.cost + '❄)', function(e) {
      self.onbuy.call(self, item)
    })
    var title = ''
    if (item.type === 'weapon') title = 'STR(' + item.str + ')'
    else if (item.type === 'armor') title = 'DEF(' + item.def + ')'
    li.setAttribute('title', title)
    store.appendChild(li)
  })
}

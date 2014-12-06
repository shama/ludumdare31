var rand = require('./common').rand
var Item = require('./items/item')

function World() {
  if (!(this instanceof World)) return new World()
  this.entities = []
  this.entityTypes = {
    player: require('./player'),
    store: require('./store'),
    snowflake: require('./snowflake'),
    enemy: require('./enemy'),
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

World.prototype.randomEnemy = function(pos, player) {
  var probability = 1
  var delta = (Math.abs(pos[0]) + Math.abs(pos[1])) / 2
  if (delta >= 100 && delta < 200) {
    probability = .95
  } else if (delta >= 200 && delta < 300) {
    probability = .9
  } else if (delta >= 300 && delta < 400) {
    probability = .75
  } else if (delta >= 400 && delta < 500) {
    probability = .5
  } else if (delta >= 500 && delta < 600) {
    probability = .4
  } else if (delta >= 600) {
    probability = 0
  }
  var r = Math.random()
  if (r > probability) {
    var e = this.spawnEntity('enemy', [pos[0], pos[1] - 20])
    e.fight(player)
  }
}

World.prototype.addItemsToStore = function() {
  var self = this
  
  self.items.coldfist = new Item({ str: 1, name: 'COLDFIST', id: 'coldfist', cost: 0 })
  self.items.icicle = new Item({ str: 5, name: 'ICICLE', id: 'icicle', cost: 10 })
  self.items.icyknife = new Item({ str: 10, name: 'ICY KNIFE', id: 'icyknife', cost: 20 })
  self.items.frostsword = new Item({ str: 30, name: 'FROST SWORD', id: 'frostsword', cost: 50 })

  var store = document.getElementById('store')
  Object.keys(self.items).forEach(function(key) {
    var item = self.items[key]
    var li = document.createElement('li')
    var a = document.createElement('a')
    a.setAttribute('href', '#')
    a.onclick = function(e) {
      e.preventDefault()
      self.onbuy.call(self, item)
    }
    a.innerHTML = item.name + '(' + item.cost + '❄)'
    li.appendChild(a)
    store.appendChild(li)
  })
}

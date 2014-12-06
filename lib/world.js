var rand = require('./common').rand
var Item = require('./items/item')

function World() {
  if (!(this instanceof World)) return new World()
  this.entities = []
  this.entityTypes = {
    player: require('./player'),
    store: require('./store'),
    snowflake: require('./snowflake'),
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

World.prototype.randomEnemy = function(chance) {
  // TODO: Random enemy encounter
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

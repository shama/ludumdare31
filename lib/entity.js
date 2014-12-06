function Entity() {
  if (!(this instanceof Entity)) return new Entity()
  this.id = 'e' + parseInt(Math.random() * 9999)
  this.created = false
  this.position = [0,0]
  this.size = [10,10]
  this.element = null
  this.tagName = 'div'
  this.char = ' '
  this.dead = false
}
module.exports = Entity

Entity.prototype.create = function() {
  this.created = true
  this.element = document.createElement(this.tagName)
  this.element.className = 'entity ' + this.id
  this.element.style.position = 'absolute'
  this.element.style.width = this.size[0] + 'px'
  this.element.style.height = this.size[1] + 'px'
  this.element.innerHTML = this.char
  document.body.appendChild(this.element)
  return this
}

Entity.prototype.kill = function() {
  this.dead = true
  return this
}

Entity.prototype.tick = function(world) {
  if (!this.created) return
  var pos = world.fromCenter(this.position)
  this.element.style.left = pos[0] + 'px'
  this.element.style.top = pos[1] + 'px'
}

Entity.prototype.move = function(to) {
  this.position[0] += to[0]
  this.position[1] += to[1]
  return this
}

function Entity(id) {
  if (!(this instanceof Entity)) return new Entity(id)
  this.id = id || 'e' + parseInt(Math.random() * 9999)
  this.created = false
  this.position = [0,0]
  this.element = null
  this.tagName = 'div'
  this.char = ' '
}
module.exports = Entity

Entity.prototype.create = function() {
  this.created = true
  this.element = document.createElement(this.tagName)
  this.element.className = 'entity ' + this.id
  this.element.style.position = 'absolute'
  this.element.style.width = '10px'
  this.element.style.height = '10px'
  this.element.innerHTML = this.char
  document.body.appendChild(this.element)
  return this
}

Entity.prototype.render = function(world) {
  if (!this.created) this.create()
  var pos = world.fromCenter(this.position)
  this.element.style.left = pos[0] + 'px'
  this.element.style.top = pos[1] + 'px'
}

function Item(data) {
  if (!(this instanceof Item)) return new Item(data)
  data = data || Object.create(null)
  this.id = data.id || 'i' + Math.random() * 9999
  this.name = data.name || '????'
  this.type = data.type || 'weapon'
  this.cost = data.cost || 0
  this.str = data.str || 0
  this.def = data.def || 0
  this.holdable = data.holdable !== false
}
module.exports = Item

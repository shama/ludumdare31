var _ = require('lodash')
var common = module.exports = {}

var tic = common.tic = require('tic')()

common.rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

common.createMenuItem = function(label, onclick) {
  var li = document.createElement('li')
  var a = document.createElement('a')
  a.setAttribute('href', '#')
  a.onclick = _.debounce(function(e) {
    e.preventDefault()
    onclick(e)
  }, 300)
  a.innerHTML = label
  li.appendChild(a)
  return li
}

var flashing = Object.create(null)
common.flash = function(id, color, time) {
  if (flashing[id]) return
  flashing[id] = true
  time = time || 500
  var oldColor = document.getElementById(id).style.backgroundColor
  document.getElementById(id).style.backgroundColor = color
  tic.timeout(function() {
    document.getElementById(id).style.backgroundColor = oldColor
    flashing[id] = false
  }, time)
}
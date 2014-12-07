var _ = require('lodash')
var vkey = require('vkey')
var common = module.exports = {}

var tic = common.tic = require('tic')()

common.rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

common.createMenuItem = function(label, onclick, kb) {
  var li = document.createElement('li')
  var a = document.createElement('a')
  a.setAttribute('href', '#')
  a.onclick = _.debounce(function(e) {
    e.preventDefault()
    onclick(e)
  }, 300)

  if (kb) {
    function onkeydown(e) {
      if (vkey[e.keyCode] === kb) onclick(e)
    }
    window.addEventListener('keydown', onkeydown, false)
    a.addEventListener('DOMNodeRemovedFromDocument', _.throttle(function(e) {
      window.removeEventListener('keydown', onkeydown, false)
    }, 100), false)
  }

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
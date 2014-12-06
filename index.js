var raf = require('raf')
var vkey = require('vkey')
var world = require('./lib/world')()

// CREATE PLAYER
var player = require('./lib/player')()
player.position = [20,10]
world.entities.push(player)

// ANIMATION TICK
raf(function tick() {
  world.render()
  raf(tick)
})

// KEYBOARD CONTROLS
window.onkeydown = function keyDown(e) {
  var key = vkey[e.keyCode]
  var speed = 10
  switch (key) {
    case '<left>':
      player.position[0] -= speed
      break
    case '<right>':
      player.position[0] += speed
      break
    case '<up>':
      player.position[1] -= speed
      break
    case '<down>':
      player.position[1] += speed
      break
  }
}

var raf = require('raf')
var vkey = require('vkey')
var tic = require('./lib/common').tic
var world = require('./lib/world')()

// CREATE PLAYER
var player = world.spawnEntity('player', [0,0])

// SPAWN SNOWFLAKES AROUND PLAYER
tic.interval(function spawnSnowflake() {
  world.spawnEntityRandom('snowflake', player.position, [50,50])
}, 5000)
world.spawnEntityRandom('snowflake', player.position, [50,50])
world.spawnEntityRandom('snowflake', player.position, [50,50])
world.spawnEntityRandom('snowflake', player.position, [50,50])
world.spawnEntityRandom('snowflake', player.position, [50,50])

// UPDATE MENU BAR
tic.interval(function updateMenu() {
  document.getElementById('menu-hp').innerHTML = 'HP: ' + player.hp
  document.getElementById('menu-snowflakes').innerHTML = 'SNOWFLAKES: ' + player.inv.snowflakes
}, 500)

// KEYBOARD CONTROLS
window.onkeydown = function keyDown(e) {
  var key = vkey[e.keyCode]
  var speed = 10
  switch (key) {
    case '<left>':
      player.move([-speed, 0])
      break
    case '<right>':
      player.move([speed, 0])
      break
    case '<up>':
      player.move([0, -speed])
      break
    case '<down>':
      player.move([0, speed])
      break
  }
}

// ANIMATION TICK
var lastdt = 0
raf(function tick(dt) {
  tic.tick(dt - lastdt)
  world.tick()
  lastdt = dt
  raf(tick)
})
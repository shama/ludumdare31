var raf = require('raf')
var vkey = require('vkey')
var tic = require('./lib/common').tic
var rand = require('./lib/common').rand
var world = require('./lib/world')()

// CREATE PLAYER
var player = world.spawnEntity('player', [0,0])

// CREATE STORE
var store = world.spawnEntityRandom('store', [0,0], [50,50])
world.onbuy = function(item) {
  store.buy(player, item)
}

// SPAWN SNOWFLAKES AROUND PLAYER
tic.interval(function spawnSnowflake() {
  world.spawnEntityRandom('snowflake', player.position, [100,100])
}, 5000)
for (var i = 0; i < 10; i++) {
  var sf = world.spawnEntityRandom('snowflake', player.position, [100,100])
  sf.lifespan = rand(10000, 60000)
}

// UPDATE MENU BARS
tic.interval(function updateMenu() {
  document.getElementById('menu-hp').innerHTML = 'HP: ' + player.hp
  document.getElementById('menu-snowflakes').innerHTML = '❄: ' + player.inv.snowflakes
  document.getElementById('menu-str').innerHTML = 'STR: ' + player.str
  document.getElementById('menu-def').innerHTML = 'DEF: ' + player.def
  document.getElementById('store').style.display = (player.canShop) ? 'block' : 'none'
}, 200)

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
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
var snowflakeWalkCount = 0
function spawnSnowflake(min, max, amount) {
  min = min || 10000
  max = max || 20000
  amount = amount || 1
  if (amount === 1) {
    amount = (Math.random() > .50) ? rand(2, 3)
      : (Math.random() > .75) ? rand(2, 6)
      : (Math.random() > .95) ? rand(5, 10)
      : 1
  }
  for (var i = 0; i < amount; i++) {
    var sf = world.spawnEntityRandom('snowflake', player.position, [100,100])
    sf.lifespan = rand(min, max)
  }
}
tic.interval(spawnSnowflake, 5000)
spawnSnowflake(10000, 60000, 8)

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
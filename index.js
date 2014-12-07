var raf = require('raf')
var vkey = require('vkey')
var tic = require('./lib/common').tic
var rand = require('./lib/common').rand
var world = require('./lib/world')()
var saveGame = require('./lib/save').save
var restoreGame = require('./lib/save').restore

var gameOver = false

// CREATE PLAYER
var player = world.spawnEntity('player', [0,0])
player.ondead = function() {
  document.body.style.backgroundColor = 'red'
  document.getElementById('fight').style.display = 'none'
  tic.timeout(function() {
    gameOver = true
    player.reset()
    saveGame(player)
  }, 100)
}

// for cheat testing ;)
//window.player = player

// CREATE STORE
var store = world.spawnEntityRandom('store', [0,0], [50,50])
world.onbuy = function(item) {
  var bought = store.buy(player, item)
  if (bought && item.id === 'snomachine') {
    var machine = world.spawnEntityRandom('snomachine', player.position, [75,75])
    machine.onemit = function() {
      spawnSnowflake(30 * 1000, 180 * 10000, rand(10, 30), machine.position, [50,50])
    }
  }
}

// SAVE / RESTORE GAME
restoreGame(player, world)
tic.interval(function() { saveGame(player) }, 2000)

// SPAWN SNOWFLAKES AROUND POS
var snowflakeWalkCount = 0
function spawnSnowflake(min, max, amount, pos, dist) {
  min = min || 10000
  max = max || 20000
  amount = amount || 1
  pos = pos || player.position
  dist = dist || [100,100]
  if (amount === 1) {
    amount = (Math.random() > .50) ? rand(2, 5)
      : (Math.random() > .75) ? rand(3, 8)
      : (Math.random() > .95) ? rand(5, 20)
      : 1
  }
  for (var i = 0; i < amount; i++) {
    var sf = world.spawnEntityRandom('snowflake', pos, dist)
    sf.lifespan = rand(min, max)
  }
}
tic.interval(spawnSnowflake, 5000)
spawnSnowflake(10000, 60000, 8)

// RANDOM ENEMY ENCOUNTERS
player.onmove = function(pos) {
  world.randomEnemy(pos, player)
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
  if (gameOver) return
  tic.tick(dt - lastdt)
  world.tick()
  lastdt = dt
  raf(tick)
})
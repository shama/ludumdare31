var inherits = require('util').inherits
var Entity = require('../entity')
var createMenuItem = require('../common').createMenuItem
var flash = require('../common').flash
var tic = require('../common').tic

function Enemy() {
  if (!(this instanceof Enemy)) return new Enemy()
  var self = this
  Entity.call(this)
  this.name = '???'
  this.char = '☀'
  this.hp = 1
  this.str = 1
  this.def = 1
  this.run = .1
  this.snowflakes = 1
  this.fightMenu = document.getElementById('fight')
  this.hpElement = null
}
inherits(Enemy, Entity)
module.exports = Enemy

Enemy.prototype.fight = function(player) {
  player.canMove = false
  var self = this
  
  this.fightMenu.style.display = 'block'

  this.hpElement = document.createElement('li')
  this.hpElement.className = 'fight-enemy'
  this.updateFightMenu()
  this.fightMenu.appendChild(this.hpElement)

  function counterAttack() {
    if (!self.dead) {
      tic.timeout(function() {
        flash('fight', 'rgba(255, 0, 0, .75)')
      }, 600)
      self.attack(player)
    }
  }

  var atk = createMenuItem('ATTACK', function(e) {
    flash('fight', 'rgba(0, 255, 0, .75)')
    player.attack(self)
    counterAttack()
  })
  this.fightMenu.appendChild(atk)

  var run = createMenuItem('RUN', function(e) {
    flash('fight', 'rgba(255, 255, 0, .75)')
    player.run(self)
    counterAttack()
  })
  this.fightMenu.appendChild(run)
}

Enemy.prototype.attack = function(player) {
  var amt = this.str - player.def
  if (amt < 0) amt = 0
  player.hit(this, amt)
}

Enemy.prototype.canRun = function(player) {
  return (Math.random() > this.run)
}

Enemy.prototype.updateFightMenu = function() {
  this.hpElement.innerHTML = this.name + '(' + this.hp + ')'
  this.hpElement.setAttribute('title', 'STR(' + this.str + ') DEF(' + this.def + ')')
}

Enemy.prototype.kill = function() {
  Entity.prototype.kill.call(this)
  this.fightMenu.innerHTML = ''
  this.fightMenu.style.display = 'none'
  return this
}

Enemy.prototype.hit = function(player, amt) {
  this.hp -= amt
  if (this.hp <= 0) {
    player.canMove = true
    player.inv.snowflakes += this.snowflakes
    this.kill()
  }
  this.updateFightMenu()
}

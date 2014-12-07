var context = window.webkitAudioContext || window.AudioContext

var jsynth = require('jsynth')
var tic = require('./common').tic
var sounds = module.exports = {}

var tau = Math.PI * 2
var queue = []

var hasInit = false
sounds.init = function() {
  var master = new context()
  var synth = jsynth(master, function(t) {
    var res = 1
    var len = queue.length
    while (len--) {
      res += queue[len](t)
    }
    return res
  })
  synth.connect(master.destination)
}

sounds.play = function(which, duration) {
  if (!hasInit) {
    hasInit = true
    setTimeout(function() {
      sounds.init()
    }, 500)
  }
  duration = duration || 500
  var index = queue.length
  queue.push(sounds[which])
  console.log('play', which, index)
  tic.timeout(function() {
    console.log('splice', index)
    queue.splice(index, 1)
  }, duration)
}

sounds.snowflake = function(t) {
  return Math.sin(t * tau * 500)
}

var common = module.exports = {}

common.tic = require('tic')()

common.rand = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

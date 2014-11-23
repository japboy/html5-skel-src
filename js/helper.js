'use strict';

var Lazy = require('lazy.js');

require('./helpers/prefixed');
require('./helpers/socials');

var modules = [
  require('./helpers/ajax'),
  require('./helpers/clock.coffee'),
  require('./helpers/css'),
  require('./helpers/css'),
  require('./helpers/dom'),
  require('./helpers/eval'),
  require('./helpers/mixin.coffee'),
  require('./helpers/promise'),
  require('./helpers/runner.coffee'),
  require('./helpers/transform'),
  require('./helpers/vector')
];

var helper = {};

Lazy(modules).each(function (module) {
  for (var func in module) {
    helper[func] = module[func];
  }
});

module.exports = helper;

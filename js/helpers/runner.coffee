'use strict'

_ = require 'underscore'

mixin = require './mixin.coffee'

###
Runner class
###
class Runner extends mixin.Base

  constructor: ->
    super()
    @started_ = false
    @funcs_ = []

  add: (func) =>
    funcs = @get 'funcs'
    funcs.push func
    @set 'funcs', funcs

  remove: (func) =>
    funcs = _.without @get('funcs'), func
    @set 'funcs', funcs

  start: =>
    @set 'started', true

  stop: =>
    @set 'started', false

  run: =>
    return unless @get('started')
    func() for func in @get('funcs')


###
Runner generator
###
createRunner =  ->
  runner = new Runner()
  return runner

# export
module.exports.createRunner = createRunner

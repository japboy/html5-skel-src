'use strict'

mixin = require './mixin.coffee'

###
Clock class
###
class Clock extends mixin.Base

  constructor: (millisec) ->
    super()
    @time_ = +(new Date())
    @span_ = millisec

  ticked: =>
    now = +(new Date())
    time = @get 'time'
    span = @get 'span'

    return false unless (now - time) > span

    @set 'time', now
    return true


###
Clock generator
###
createClock = (millisec) ->
  clock = new Clock millisec
  return clock

# export
module.exports.createClock = createClock

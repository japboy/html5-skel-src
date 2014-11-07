'use strict'

###
Base class
###
class Base

  constructor: ->

  set: (prop, val) =>
    @["#{prop}_"] = val

  get: (prop) =>
    return @["#{prop}_"]


###
Mixin helper to extend multiple classes
###
mixOf = (base, mixins...) ->
  class Mixed extends base
  for mixin in mixins by -1
    Mixed::[name] = method for name, method of mixin::
  return Mixed

# export
module.exports =
  Base: Base
  mixOf: mixOf

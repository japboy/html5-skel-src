'use strict'

{EventEmitter} = require 'events'

helper = require './helper'

root = module.exports

class root.Blog extends helper.mixOf helper.Base, EventEmitter

  constructor: (domain, consumerKey, secretKey) ->
    super()
    @consumerKey_ = consumerKey
    @secretKey_ = secretKey or null
    @domain_ = domain

  destroy: =>
    @removeAllListeners()

  request: (type) =>
    consumerKey = @get 'consumerKey'
    domain = @get 'domain'
    uri = "http://api.tumblr.com/v2/blog/#{domain}/posts/#{type}?api_key=#{consumerKey}"
    done = (data) =>
      return @emit('load', data.response) if 200 is data.meta.status
      @emit 'error', new Error(data.meta.status + ' ' +  data.meta.msg)
    fail = (err) => @emit 'error', err
    helper.jsonp(uri).then(done, fail)

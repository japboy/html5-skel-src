'use strict';

var Q = require('q');
var _ = require('underscore');

var d = global.document;

/**
 * Promise object for JSONP
 */
function jsonp (uri) {
  var dfr = Q.defer(), script = d.createElement('script');
  global.___jsonp = function (data) { dfr.resolve(data); };
  script.setAttribute('src', uri + '&callback=___jsonp');
  d.getElementsByTagName('head')[0].appendChild(script);
  return dfr.promise;
}

/**
 * Promise object for XHR
 */
function xhr (method, uri, data_) {
  var dfr = Q.defer(), xhr_ = new global.XMLHttpRequest(), data = data_ ? data_ : null;
  xhr_.addEventListener('readystatechange', function (ev) {
    if (4 === ev.target.readyState && 200 === ev.target.status) {
      dfr.resolve(global.JSON.parse(ev.target.responseText));
    }
  });
  xhr_.open(method, uri, true);
  xhr_.send(data);
  return dfr.promise;
}

// export
module.exports = {
  jsonp: jsonp,
  xhr: xhr
};

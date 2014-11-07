'use strict';

var Q = require('q');

var d = global.document;

/**
 * Shorthand to remove an element
 */
function removeElement (el) {
  el.parentNode.removeChild(el);
}

/**
 * Promise object for DOM
 */
function dom () {
  var dfr = Q.defer();
  d.addEventListener('DOMContentLoaded', function load (ev) {
    ev.target.removeEventListener(ev.type, load);
    dfr.resolve(ev.target);
  }, false);
  return dfr.promise;
}

/**
 * Promise object for Image element
 */
function img (uri) {
  var dfr = Q.defer(), img_ = d.createElement('img');
  img_.addEventListener('error', function error (ev) {
    ev.target.removeEventListener(ev.type, error);
    dfr.reject(new Error(uri));
  });
  img_.addEventListener('load', function load (ev) {
    ev.target.removeEventListener(ev.type, load);
    dfr.resolve(ev.target);
  });
  img_.setAttribute('src', uri);
  return dfr.promise;
}

// export
module.exports = {
  removeElement: removeElement,
  dom: dom,
  img: img
};

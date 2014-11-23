'use strict';

var d = global.document;
var M = global.Modernizr;

/**
 * Polyfill for `animationstart`
 */
function animationstart () {
  var prefixes = {
    'WebkitAnimation': 'webkitAnimationStart',
    'MozAnimation': 'animationstart',
    'animation': 'animationstart'
  };
  return prefixes[M.prefixed('animation')];
}

/**
 * Polyfill for `animationiteration`
 */
function animationiteration () {
  var prefixes = {
    'WebkitAnimation': 'webkitAnimationIteration',
    'MozAnimation': 'animationiteration',
    'animation': 'animationiteration'
  };
  return prefixes[M.prefixed('animation')];
}

/**
 * Polyfill for `animationend`
 */
function animationend () {
  var prefixes = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'animationend',
    'animation': 'animationend'
  };
  return prefixes[M.prefixed('animation')];
}

/**
 * Polyfill for `transitionend`
 */
function transitionend () {
  var prefixes = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
  };
  return prefixes[M.prefixed('transition')];
}

/**
 * Polyfill for `transform`
 */
function transform () { return M.prefixed('transform'); }

/**
 * Polyfill for vendor prefixed name
 */
function polyfill (name) {
  var prefixed = {
    'animationstart': animationstart,
    'animationiteration': animationiteration,
    'animationend': animationend,
    'transitionend': transitionend,
    'transform': transform
  };
  return prefixed[name]();
}

/**
 * Boolean value for support condition
 */
function supported (name) {
  var events = {
    'animationstart': M.cssanimations,
    'animationiteration': M.cssanimations,
    'animationend': M.cssanimations,
    'transitionend': M.csstransitions
  };
  return events[name];
}

/**
 * Event listener for polyfill events
 */
function listen (target, event, millisec, callback) {
  if (!supported(event)) return global.setTimeout.call(target, callback, millisec);
  target.addEventListener(polyfill(event), callback, false);
}

/**
 * Event listener remover for polyfill events
 */
function removeListening (target, event, func) {
  if (func) return target.removeEventListener(polyfill(event), func);
  target.removeEventListener(polyfill(event));
}

/**
 * Style
 */
function style (target, prop, val) {
  target.style[polyfill(prop)] = val;
}

// export
module.exports = {
  animationstart: animationstart,
  animationend: animationend,
  transitionend: transitionend,
  polyfill: polyfill,
  supported: supported,
  listen: listen,
  removeListening: removeListening
};

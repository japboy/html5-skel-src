'use strict';

var Lazy = require('lazy.js');
var Q = require('q');

var helper = require('./helper');
var tumblr = require('./tumblr.coffee');

var d = global.document;

var CONSUMER_KEY = process.env.TUMBLR_CONSUMER_KEY;

var runner = helper.createRunner();

function blog (domain) {
  var dfr = Q.defer(), tumblrBlog = new tumblr.Blog(domain, CONSUMER_KEY);
  tumblrBlog.on('load', dfr.resolve);
  tumblrBlog.on('error', dfr.reject);
  tumblrBlog.request('photo');
  return dfr.promise;
}

function thumb (el, i) {
  el.className = 'view__thumb';
  el.setAttribute('id', 'thumb-' + i);
  el.setAttribute('alt', '');
  el.style.marginLeft = '-' + (el.width / 2) + 'px';
  el.style.marginTop = '-' + (el.height / 2) + 'px';
  return el;
}

function fail (err) {
  console.error(err.message);
}

function ready (data) {
  var loader = d.querySelector('.loader__mask');
  var main = d.getElementById('main'), view = d.createElement('div');
  var inc = 0, len = data.length;
  var clock = helper.createClock(5000);

  view.className = 'view';

  main.appendChild(view);

  var el = thumb(data[inc], inc);
  el.className += ' fade--in';
  view.appendChild(el);

  function slide () {
    if (!clock.ticked()) return;
    helper.listen(el, 'animationend', 100, function animationend (ev) {
      helper.removeListening(el, 'animationend', animationend);
      view.removeChild(el);
      el = thumb(data[inc], inc);
      el.className += ' fade--in';
      view.appendChild(el);
    });
    el.className = el.className.replace('fade--in', 'fade--out');
    inc += 1;
    if (inc >= len) inc = 0;
  }

  runner.add(slide);
  runner.start();

  helper.listen(loader, 'transitionend', 100, function transitionend (ev) {
    helper.removeListening(loader, 'transitionend', transitionend);
    helper.removeElement(loader);
  });

  loader.className += ' fade--out';
}

function filter (data) {
  var posts = Lazy(data[1].posts)
    .pluck('photos')
    .flatten()
    .pluck('original_size')
    .flatten()
    .pluck('url');
  helper.promises(posts.toArray(), helper.img).then(ready, fail);
}

function animate () {
  global.requestAnimationFrame(animate);
  runner.run();
}

function init () {
  var tumblrs = [
    'iheartmirandakerr.tumblr.com',
    'likemirandakerr.tumblr.com',
    'mirandakerrfashionstyle.tumblr.com',
  ];

  var promises = [
    helper.dom(d),
    blog(tumblrs[ Lazy.range(3).shuffle().toArray()[0] ]),
    helper.sleep(3000)
  ];

  Q.all(promises).then(filter, fail);
  animate();
}

init();

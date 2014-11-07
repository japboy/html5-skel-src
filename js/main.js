'use strict';

var Q = require('q');
var _ = require('underscore');

var helper = require('./helper');
var tumblr = require('./tumblr.coffee');

var d = global.document;

var CONSUMER_KEY = '';

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
  el.setAttribute('id', 'thumb_' + i);
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
  el.className += ' fade__in';
  view.appendChild(el);

  function slide () {
    if (!clock.ticked()) return;
    helper.listen(el, 'animationend', 100, function animationend (ev) {
      helper.removeListening(el, 'animationend', animationend);
      view.removeChild(el);
      el = thumb(data[inc], inc);
      el.className += ' fade__in';
      view.appendChild(el);
    });
    el.className = el.className.replace('fade__in', 'fade__out');
    inc += 1;
    if (inc >= len) inc = 0;
  }

  runner.add(slide);
  runner.start();

  helper.listen(loader, 'transitionend', 100, function transitionend (ev) {
    helper.removeListening(loader, 'transitionend', transitionend);
    helper.removeElement(loader);
  });

  loader.className += ' fade__out';
}

function filter (data) {
  var posts = data[1].posts, photos_length = posts.length;
  var photos = _.flatten(_.pluck(posts, 'photos'));
  //var thumbs = _.where(_.flatten(_.pluck(photos, 'alt_sizes')), { width: 1280 });
  var thumbs = _.flatten(_.pluck(photos, 'original_size'));
  helper.preloads(_.pluck(thumbs, 'url'), helper.img).then(ready, fail);
}

function animate () {
  global.requestAnimationFrame(animate);
  runner.run();
}

var tumblrs = [
  'iheartmirandakerr.tumblr.com',
  'likemirandakerr.tumblr.com',
  'mirandakerrfashionstyle.tumblr.com',
];

var promises = [
  helper.dom(),
  blog(tumblrs[ _.random(0, 5) ]),
  helper.sleep(3000)
];

Q.all(promises).then(filter, fail);
animate();

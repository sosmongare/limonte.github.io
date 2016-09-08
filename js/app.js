'use strict';

document.addEventListener('DOMContentLoaded', function() {
  var data = {
    sound: localStorage.getItem('sound')? JSON.parse(localStorage.getItem('sound')) : true,
    backgroundMusic: new Audio('/mp3/The_Commission_Creton.mp3')
  };

  var vm = new Vue({
    el: '#app',
    data: data,
    created: function() {
      this.backgroundMusic.volume = 0.5;
      this.backgroundMusic.loop = true;
      if (this.sound) {
        this.backgroundMusic.play();
      }
    }
  });

  vm.$watch('sound', function(sound) {
    if (sound) {
      this.backgroundMusic.play();
    } else {
      this.backgroundMusic.pause();
    }
    localStorage.setItem('sound', sound);
  });

  var zippi = new Audio('/mp3/zippi.mp3');
  zippi.volume = 0.3;

  var skillBoxes = document.getElementsByClassName('skillBox');

  var svg = document.getElementById('svg');
  svg.addEventListener('load', function() {
    symmetry(svg);
    var svgDoc = svg.contentDocument;

    svgDoc.onclick = function(e) {
      var target = e.target;
      if (target.classList.contains('skill') && !target.classList.contains('current')) {
        var current = svgDoc.getElementsByClassName('current');
        if (current.length) {
          current[0].classList.remove('current');
        }

        target.classList.add('active');
        target.classList.add('current');

        var skillName = target.getAttribute('id');
        Array.from(skillBoxes).forEach(function(box) {
          box.style.left = '-999px';

          // box to animate
          if (box.classList.contains(skillName)) {
            var boxWidth = box.offsetWidth;
            var boxHeight = box.offsetHeight;

            // set initial dimensions for animation
            box.style.width = '0px';
            box.style.height = '3px';
            box.style.left = '50%';

            TinyAnimate.animateCSS(box, 'width', 'px', 0, boxWidth, 220, 'easeOutQuad', function() {
              TinyAnimate.animateCSS(box, 'height', 'px', 3, boxHeight, 220, 'easeOutQuad');
            });
          }
        });

        if (data.sound) {
          zippi.play();
        }
      }
    };
  }, false);
});

function symmetry(svg) {
  var width = svg.offsetWidth;
  var svgDoc = svg.contentDocument;
  var symmetrySource = svgDoc.getElementById('symmetry-source');
  var symmetryTarget = svgDoc.getElementById('symmetry-target');

  var elementsToFlip = symmetrySource.querySelectorAll('path, polygon, line, circle');

  for (var i = 0; i < elementsToFlip.length; i++) {
    var original = elementsToFlip[i];
    var flipped = original.cloneNode(true);
    if (original.getAttribute('symmetry-id')) {
      flipped.setAttribute('id', original.getAttribute('symmetry-id'));
    }

    // flip line
    if (flipped.tagName === 'line') {
      var x1 = width - flipped.getAttribute('x1');
      var x2 = width - flipped.getAttribute('x2');
      flipped.setAttribute('x1', x1);
      flipped.setAttribute('x2', x2);

    // flip circle
    } else if (flipped.tagName === 'circle') {
      var cx = width - flipped.getAttribute('cx');
      flipped.setAttribute('cx', cx);

    // flip path, polygon
    } else {
      var attr;
      if (flipped.tagName === 'path') {
        attr = 'd';
      } else if (flipped.tagName === 'polygon') {
        attr = 'points';
      }

      var points = flipped.getAttribute(attr).split(' ');
      for (var j = 0; j < points.length; j++) {
        var x = points[j].match(/(\d+),/);
        if (x) {
          x = x[1];
        } else {
          continue;
        }
        x = width - x;
        points[j] = points[j].replace(/\d+,/, x + ',');
      }
      points = points.join(' ');
      flipped.setAttribute(attr, points);
    }

    symmetryTarget.appendChild(flipped);
  }
}

console.log(`        ..
      ..  ..
            ..
             ..
            ..
           ..
         ..
##       ..   ####
##............##  ##
##...COFFEE...##   ##
##..KEEPS.ME..## ##
##....WARM....###
 ##...........##
  ############
`);

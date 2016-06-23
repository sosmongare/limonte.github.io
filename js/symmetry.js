$(window).load(function() {
  var width = 1000;

  var container = $('#svg');
  var svg = container.contents();

  var symmetrySource = svg.find('#symmetry-source');
  var symmetryTarget = svg.find('#symmetry-target');
  var elementsToFlip = symmetrySource.find('path, polygon, line, circle');

  for (var i = 0; i < elementsToFlip.length; i++) {
    var original = elementsToFlip[i];
    var flipped = original.cloneNode(true);
    if (original.getAttribute('symmetry-id')) {
      flipped.setAttribute('id', original.getAttribute('symmetry-id'));
    }

    // flip curve

    if (flipped.tagName === 'line') {
      var x1 = width - flipped.getAttribute('x1');
      var x2 = width - flipped.getAttribute('x2');
      flipped.setAttribute('x1', x1);
      flipped.setAttribute('x2', x2);

    } else if (flipped.tagName === 'circle') {
      var cx = width - flipped.getAttribute('cx');
      flipped.setAttribute('cx', cx);

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

    symmetryTarget.append(flipped);
  }
});

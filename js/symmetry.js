(function() {
  var width = 1000;

  // start
  window.onload = function() {
    var container = document.getElementById('svg');
    var svg = container.contentDocument;

    var symmetrySource = svg.getElementById('symmetry-source');
    var symmetryTarget = svg.getElementById('symmetry-target');
    var paths = symmetrySource.getElementsByTagName('path');

    for (var i = 0; i < paths.length; i++) {
      var original = paths[i];
      var flipped = original.cloneNode(true);

      // flip curve
      var d = flipped.getAttribute('d');
      var points = d.split(' ');
      for (var j = 0; j < points.length; j++) {
        var x = points[j].match(/(\d+),/)[1];
        x = width - x;
        points[j] = points[j].replace(/\d+,/, x + ',');
      }
      d = points.join(' ');
      flipped.setAttribute('d', d)

      symmetryTarget.appendChild(flipped);
    }
  }
})();
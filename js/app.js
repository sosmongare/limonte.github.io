$(window).load(function() {
  var container = $('#svg');
  var svg = container.contents();

  svg.on('click', '.skill', function() {
    var cln = this.cloneNode();
    svg.find('#symmetry-source, #symmetry-target, #center').addClass('top-offset');
    svg.find('#skill').append(cln);
  });

  $('audio')[0].play();
});

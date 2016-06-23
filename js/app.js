$(window).load(function() {
  var container = $('#svg');
  var svg = container.contents();

  svg.on('click touchstart', '.skill', function() {
    svg.find('.skill').removeClass('current');
    $(this).addClass('active current');

    $('.skill').css('left', -999);
    var skill = $(this).attr('id');
    var block = $('.skill.' + skill);
    var blockWidth = block.width();
    var blockHeight = block.height();
    block.css({
      width: 0,
      height: 3,
      left: 900
    });
    block.animate({
      width: blockWidth
    }, 150, function() {
      $(this).animate({
        height: blockHeight
      }, 150);
    });

    var zippi = new Audio('/mp3/zippi.mp3');
    zippi.volume = 0.3;
    zippi.play();
  });

  var backgroundMusic = new Audio('/mp3/The_Commission_Creton.mp3');
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();
});

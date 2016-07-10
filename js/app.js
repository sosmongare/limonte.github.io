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

$(window).on('load', function() {
  var svg = $('#svg').contents();
  var zippi = new Audio('/mp3/zippi.mp3');
  zippi.volume = 0.3;

  svg.on('click touchstart', '.skill:not(.current)', function() {
    svg.find('.skill').removeClass('current');
    $(this).addClass('active current');

    // detect block dimensions
    $('.skill').css('left', -999);
    var skillName = $(this).attr('id');
    var block = $('.skill.' + skillName);
    var blockWidth = block.width();
    var blockHeight = block.height();

    // set initial dimensions for animation
    block.css({
      width: 0,
      height: 3,
      left: '50%'
    });

    block.animate(
      // first, animate block horizontally
      {width: blockWidth}, 150,
      function() {
        // then vertically
        $(this).animate({height: blockHeight}, 150);
      }
    );

    if (data.sound) {
      zippi.play();
    }
  });

  // initial hightlight brain triangles, little bit of recursion here :)
  var brainParts = svg.find('.skill');
  var highlightBrainParts = function(depth) {
    if (depth > 20) {
      return;
    }
    var index = parseInt(Math.random() * brainParts.length, 10);
    $(brainParts[index]).addClass('active');
    setTimeout(function() {
      $(brainParts[index]).removeClass('active');
      highlightBrainParts(depth + 1);
    }, 50);
  };

  highlightBrainParts(0);
});

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
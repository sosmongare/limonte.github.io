var data = {
  sound: localStorage.getItem('sound')? JSON.parse(localStorage.getItem('sound')) : true,
  backgroundMusic: new Audio('/mp3/The_Commission_Creton.mp3')
};

var vm = new Vue({
  el: '#app',
  data: data,
  created: function() {
    this.backgroundMusic.volume = 0.5;
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

$(window).load(function() {
  var container = $('#svg');
  var svg = container.contents();

  svg.on('click touchstart', '.skill:not(.current)', function() {
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
      left: '55%'
    });
    block.animate({
      width: blockWidth
    }, 150, function() {
      $(this).animate({
        height: blockHeight
      }, 150);
    });

    if (data.sound) {
      var zippi = new Audio('/mp3/zippi.mp3');
      zippi.volume = 0.3;
      zippi.play();
    }
  });

});

/*console.log(`        ..
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
`);*/
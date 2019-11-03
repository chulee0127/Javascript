// window.onload = function() {}; -> 함수를 마지막에 실행
// window.open() -> 새로운 페이지 open 298p
//jQuery(function(){   // $ = jQuery 자바스크립트에서
//    alert('Ready');  // $(document).ready(function(){  }); = $(function(){  }); --> jQuery에서 간결하게 제공
//});

$.noConflict(); // 충돌 방지 Prototype 프레임워크 식별자($)와 겹침
var J = jQuery;

J(function () {
    function moveSlider(index) {
        var willMoveLeft = -(index * 600);
        J('.slider_panel').animate({ left: willMoveLeft }, 'slow');

        J('.control_button[data-index=' + index + ']').addClass('active');
        J('.control_button[data-index!=' + index + ']').removeClass('active');


        J('.slider_text[data-index=' + index + ']').show().animate({
            left: 0
        }, 'slow');

        J('.slider_text[data-index!=' + index + ']').hide('slow', function () {
            J(this).css('left', -300);
        });
    }

    J('.slider_text').css('left', -300).each(function(index){
        J(this).attr('data-index', index);
    });

    J('.control_button').each(function(index){
        J(this).attr('data-index', index);
    }).click(function(){
        var index = J(this).attr('data-index');
        moveSlider(index);
    });

    var randomNumber = Math.round(Math.random() * 4);
    moveSlider(randomNumber);
});
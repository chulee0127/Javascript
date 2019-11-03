$.noConflict();
var J = jQuery;

J(function () {

    // 버튼 색깔 구분!!
    J('.control_button').each(function(index, buttonColor){
        J(this).addClass('high-light-' + index);
    })
    
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
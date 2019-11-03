$.noConflict(); // 충돌 방지 Prototype 프레임워크 식별자($)와 겹침
var J = jQuery;

var a = 0;
var b = 0;

J(function(){
    J('.title').hover(function(){ // 메인 header를 클릭했을 때 마우스 이벤트
        J(this).addClass('mouseEvent');
    }, function(){
        J(this).removeClass('mouseEvent');
    });

    J('.Bar').hover(function(){ // '공지사항', '작품들'을 눌렀을 때 마우스 이벤트
        J(this).addClass('mouseEvent2');
    }, function(){
        J(this).removeClass('mouseEvent2');
    });

    J('.slider_image').on('click', function(){ // 이미지 누르면 새로운 페이지 open
        window.open('/image', 'child', 'width=300', 'height=200, location=1, menubar=1', true);
    });

    J('textarea').keyup(function () { // 메인화면에 있는 텍스트 글자 수 세기
        var inputLength = J(this).val().length;
        var remain = 150 - inputLength;

        setTimeout(function () {
            J('#textNumber').html(remain);
        }, 500)
    });
});

J(function () { // 이미지 함수
    
    J('.control_button').each(function (index, buttonColor) { // 버튼 색깔 구분!!
        J(this).addClass('high-light-' + index);
    });

    function moveSlider(index) {

        if (index > 4) { index = 0; }

        var timeOut = setTimeout(function () { moveSlider(++index) }, 3000);

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

        if (a == 1) {
            a == 0; // 클릭 이벤트를 사용하지 않는다고 표시
            b = index; // b에다 index값을 넣고 함수를 다시 실행하려고 했으나, 실패
            J(function () {
                clearTimeout(timeOut);
            });
            // 멈추는데 까지는 성공, 다시 움직여야됨
        };
    }

    J('.slider_text').css('left', -300).each(function (index) {
        J(this).attr('data-index', index);
    });

    J('.control_button').each(function (num) {
        J(this).attr('data-index', num);
    }).click(function () {
        var num = J(this).attr('data-index');
        a = 1;
        moveSlider(num);
    });

    var randomNumber = Math.round(Math.random() * 4);
    moveSlider(randomNumber);
});
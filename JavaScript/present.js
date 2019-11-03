/*window.onload = function () {
    var header = document.createElement('h1');
    var textNode = document.createTextNode('다음에는~ 더 이쁜걸로 해줄께!!');

    header.appendChild(textNode);
    document.body.appendChild(header);
};
*/

$.noConflict();
var J = jQuery;

var accept = confirm('너무 기대는 하지말구..재밌게 열어봐ㅎㅎ');
alert(accept);

if (accept == 0) {
    while (true) {
        var reAccept = confirm('수락해주세영~~~');
        alert(reAccept);
        if (reAccept == 1)
            break;

        else if (reAccept == 0) {
            continue;
        }
    }
}

var num = prompt('오늘은 솔이의 생일 입니다. 그대의 생년월일 6자리를 입력해주세요!', '힌트 : 97xxxx');

if (num.indexOf('970214') != -1) {
    alert('태어나줘서 고맙습니다ㅎㅎ');
    alert('어렸을때부터 귀여웠던 솔아');
    alert('앞으로도 애기때처럼 내 앞에서 깜찍하게 브이~해줘><');
}
else {
    while (true) {
        var reNum = prompt('정답 : 970214', '정답 : 970214');
        if (reNum.indexOf('970214') != -1) {
            alert('태어나줘서 고맙습니다ㅎㅎ');
            alert('어렸을때부터 귀여웠던 솔아');
            alert('앞으로도 애기때처럼 내 앞에서 깜찍하게 브이~해줘><');
            break;
        }
        else
            continue;
    }
}

J(document).ready(function () {

    J('button').css('fontSize', 30);

    J('h1').hover(function(){ // hover --> mouseenter와 mouseleave 동시실행
        J(this).addClass('reverse');
    }, function(){
        J(this).removeClass('reverse');
    })

    J('h1').on('click', function(){
        J(this).html(function(index, html){
            return html + '♡';
        })
    });

    J('button').one('click', function () {
        J(this).html('버튼 눌러따!!').css('fontSize', 50).css('backgroundColor', 'orange');
        
        alert('뾰로롱~~~');

        J('h1').html('다음에는 더 이쁘게 만들어줄께~~~');
    });
});

var page = window.open('', '', 'width=1100, height=600', true);
if (page) {
    page.document.write('<h1>생일 축하합니다~생일 축하합니다~사랑하는~우리 솔이~~생일 축하합니다~<br></h1>');
    page.document.write('<h1>짝짝짝짝~~~</h1>');
}
else
    alert('팝업 차단을 해제해주세요~~~');
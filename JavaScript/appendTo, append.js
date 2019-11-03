$.noConflict(); // 충돌 방지 prototype메서드($)와 겹침
var J = jQuery;

J(document).ready(function(){
    J('<h1>Hello World</h1>').css('color', 'orange').appendTo('body');
    J('<img />').attr('src', 'image1.JPG').attr({width:300, height:200}).appendTo('body');
    J('<br><button>버튼!!</button><br>').css('fontSize', 50).appendTo('body');
    J('body').append('문자열1', ' 문자열2', '<h1>append태그 생성</h1>').css('fontSize', 30);
 });
/*
<body>
<h1>Lorem ipsum</h1>
    <p>Lorem ipsum dolor sit</p>
    <h1>Lorem ipsum</h1>
    <p>문자열?</p>
    그냥 문자열과 태그p의 차이
    <h1 id="target">Header-1</h1>
    <h1 class="item">헤더0</h1>
    <h1 class="item select">헤더1</h1>
    <h1 class="item">헤더2</h1>
*/
jQuery(function(){   // $ = jQuery 자바스크립트에서
    alert('Ready');  // $(document).ready(function(){  }); = $(function(){  }); --> jQuery에서 간결하게 제공
});                  // color, fontSize, fontBackground, background

$(document).ready(function(){
    $('h1, p').css('color', 'orange'); //h1태그, p태그
    $('p').css('fontSize', 40); //p태그
    $('#target').css('color', 'blue'); // 아이디 선택자가 뒤에 있으면 상관이 없는데 아이디 선택자가 태그 선택자보다 앞에 있으면 적용x
    $('.item').css('color', 'red'); //class item 태그
    $('h1.item').css('background', 'green'); //h1태그 중 item class
    $('.item.select').css('color', 'black'); //item class 중 select태그까지
});
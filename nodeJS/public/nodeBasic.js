// load 입력 양식이 2가지??, serializeArray()사용 방법

$.noConflict(); // 충돌 방지 Prototype 프레임워크 식별자($)와 겹침
var J = jQuery;

J(function(){
    //J('body').load('/data.html'); // 이거 실행하면 밑에 json, xml이 html페이지에 안뜸, why?
/*
    J.getJSON('/data.json', function(data){ // data.json 외부참조
        J.each(data, function(key, value){
            J('body').append('<h1>'+value.name+' : ' + value.price + '</h1>');
        })
    });

    J.ajax({ // data.xml 외부참조
        url: 'data.xml',
        success: function(data){
            J(data).find('product').each(function(){
                var 이름 = J(this).find('name').text()
                var 가격 = J(this).find('price').text()

                J('<h1></h1>').text(이름 + ' : ' + 가격).appendTo('body')
            });
        }
    })
*/
    J('#my-form').submit(function(event){ // get방식인지, post방식인지?
        J('#wrap').load('/parameter', J(this).serialize()); // /parameter URL을 어떤식으로 불러오는건지???

        event.preventDefault(); // submit의 고유 특성인 매개변수를 요청한 후, 페이지 전환을 막기위해 기본 이벤트 제거
    });
});
/*
J(function () { // 스피너(jQuery Ajax)
    J(document).ajaxComplete(function () { // 체이닝으로 연결
        J('#ajax-event').append('<h1>AjaxComplete<h1>')
    }).ajaxError(function () {
        J('#ajax-event').append('<h1>AjaxError<h1>')
    }).ajaxSend(function () {
        J('#ajax-event').append('<h1>AjaxSend<h1>')
    });
    J(document).ajaxSuccess(function () {
        J('#ajax-event').append('<h1>AjaxSuccess<h1>')
    }).ajaxStart(function () {
        J('#ajax-event').append('<h1>AjaxStart<h1>')
    });

    J('#wrap2').load('/data.json');
});
*/
J(function(){ // get, post, put, delete 버튼
    J('#get').click(function(){
        J.ajax({
            url: '/products',
            type: 'get',
            dataType: 'text',
            success: function(data){
                J('#output').val(data);
            }
        })
     });

    J('#post').click(function(){
        J.ajax({
            url: '/products',
            type: 'post',
            dataType: 'text',
            data: {
                name: J('#name').val(), // input태그 안에 들어가는 값을 ajax, data에 저장한다
                price: J('#price').val()
            },
            success: function(data){
                J('#output').val(data);
            }
        })
     });

    J('#put').click(function(){
        J.ajax({
            url: '/products/0',
            type: 'put',
            dataType: 'text',
            data: {
                name: J('#name').val(),
                price: J('#price').val()
            },
            success: function(data){
                J('#output').val(data); // 어떤 경로로 output태그에 뜨는건지!! 서버를 어떻게 거치는지 과정이 이해가 안됨(products/0 이라는 url이 어디?)
            }
        });
     });

    J('#delete').click(function(){
        J.ajax({
            url: '/products/0',
            type: 'delete',
            dataType: 'text',
            success: function(data){
                J('#output').val(data);
            }
        })
     });
})

J(function(){ 
    J('#write_form').submit(function(event){
        J.post('/messages', J(this).serialize());

        event.preventDefault();
    });

    setInterval(function(){ 
        J.getJSON('/messages', {
            dummy: new Date().getTime()
        }, function(data){
            J('#output2').empty();

            J.each(data, function(index, item){
                var output = '';
                output += '<h2>' + item.name + '</h2>';
                output += '<p>' + item.content + '</p>';
                J('<div></div>').html(output).prependTo('#output2');
            });
        });
    }, 1000);
});

/*
J.ajax({ // 위에 코드보다 이게 먼저 출력 because $(document).ready(function(){  }); == window.onload = function(){ };
    url: '/parameter',
    type: 'GET',
    data: {
        name: 'test',
        region: 'test'
    },
    success: function(data){
        J('body').append(data);
    }
});
*/
// jQuery를 사용하지 않고 이벤트 연결(버튼과 서버 연결), 왜 jQuery는 4, 200 안따짐??
window.onload = function () { // 비동기 방식 XMLHttpRequest 객체랑 같이 실행하면 실행 안됨, why?
    document.getElementById('get').onclick = function () {

        var request = new XMLHttpRequest(); // ajax객체
        request.open('GET', '/products', true);
        request.send(); // ajax보내고 내 할일

        request.onreadystatechange = function (event) { // 다른일하고있다가 일단 응답이오면 함수 실행
            if (request.readyState == 4) {
                if (request.status == 200) {

                    document.getElementById('output').value += request.responseText; // ajax특징이 이것만 바꿔준다
                };
            };
        };
    };

    document.getElementById('post').onclick = function () {
        var name = document.getElementById('name').value;
        var price = document.getElementById('price').value;

        var request = new XMLHttpRequest();
        request.open('POST', '/products', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send('name=' + name + '&price=' + price);

        request.onreadystatechange = function (event) {
            if (request.readyState == 4) {
                if (request.status == 200) {

                    document.getElementById('output').value += request.responseText;
                };
            };
        };
    };

    document.getElementById('put').onclick = function () {
        var name = document.getElementById('name').value;
        var price = document.getElementById('price').value;

        var request = new XMLHttpRequest();
        request.open('PUT', '/products/0', true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.send('name=' + name + '&price=' + price);

        request.onreadystatechange = function (event) {
            if (request.readyState == 4) {
                if (request.status == 200) {

                    document.getElementById('output').value += request.responseText;
                };
            };
        };
    };

    document.getElementById('delete').onclick = function () {
        var request = new XMLHttpRequest();
        request.open('DELETE', '/products/0', true);
        request.send();

        request.onreadystatechange = function (event) {
            if (request.readyState == 4) {
                if (request.status == 200) {

                    document.getElementById('output').value += request.responseText;
                };
            };
        };
    };

};
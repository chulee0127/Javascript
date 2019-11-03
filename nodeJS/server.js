// 모듈 추출
var express = require('express'); // express -> 외부 모듈
var bodyParser = require('body-parser'); // body-parser -> 요청 매개변수를 추출하기 위한 미들웨어

var items = [
    { name: '우유', price: '2000' },
    { name: '홍차', price: '3000' },
    { name: '스무디', price: '4000' },
    { name: '라떼', price: '5000' }
];

var app = express();
app.use(express.static('public')); // static 미들웨어, 매개변수로 폴더이름 -> public 폴더안에 있는 index.html 파일을 기본적으로 실행
app.use(bodyParser.urlencoded({extended: false}));

var messages = [];

app.get('/messages', function(request, response){ 
    response.send(messages);
});

app.post('/messages', function(request, response){ 
    var name =request.body.name;
    var content = request.body.content;
    var message = {
        name: name,
        content: content
    };
    messages.push(message);

    response.send({
        message: '데이터를 추가했습니다.',
        data: message
    });
});

app.all('/a', function(request, response){ // router 미들웨어 all메서드
    response.send('<h1>Page A</h1>');
});

app.all('/data.json', function(request, response){ // json 방식으로 items 추출
    var intervalID = setInterval(function(){
        response.send(items);
    }, 2000);

    setTimeout(function(){
        clearInterval(intervalID);
    }, 11000);
});

app.all('/data.xml', function (request, response) { // xml 방식으로 items 추출
    var output = '';                                
    output += '<?xml version="1.0" encoding="UTF-8"?>';
    output += '<products>';

    items.forEach(function (item) {
        output += '<product>';
        output += '<name>' + item.name + '</name>';
        output += '<price>' + item.price + '</price>';
        output += '</product>'
    });
    output += '</products>';

    //response.type('text/xml'); // type메서드 사용 안했는데도 xml로 인식
    response.send(output);
});

app.all('/parameter', function(request, response){ // url 뒤에 매개변수 입력 http://127.0.0.1:50000/parameter/name=jung&region=uiwang, si
    var name = request.query.name;                 // index.html의 함수들이랑 어떻게 연관이 되는지?
    var region = request.query.region;

    response.send('<h1>' + name + ' : ' + region + '</h1>');
});

app.all('/parameter/:id', function(request, response){ // http://127.0.0.1:50000/parameter/test -> url 뒷부분 동적으로 받음
    var id = request.params.id;

    response.send('<h1>' + id +'</h1>');
});

 // 라우트 구성
app.get('/products', function(request, response) { // GET방식(자원 조회)으로 items 출력(json방식이랑 동일)
    response.send(items);
});

app.get('/products/:id', function(request, response) { // url 뒤에 동적으로 받음
    var num = Number(request.params.id);               // num은 items 객체의 배열번호

    if(isNaN(num)){ // num이 숫자가 아닌 경우
        response.send({ error: '숫자를 입력하세요!'});
    }
    else if(items[num]){
        response.send(items[num]);
    }
    else{ // num의 숫자가 배열번호 0, 1, 2 이외의 숫자
        response.send({ error: '존재하지 않는 데이터입니다!'});
    }
});

app.post('/products', function (request, response) { // post, 데이터 추가(포스트맨으로 실행)
    var name = request.body.name; // name들 하나하나의 경로, index.html이랑 어떻게 연관이 되는지?
    var price = request.body.price;

    var item = { name: name, price: price };

    items.push(item);

    response.send({
        message: '데이터를 추가했습니다',
        data: item
    });
});

app.put('/products/:id', function (request, response) { // put, 데이터 수정(포스트맨으로 실행)
    var id = Number(request.params.id);                 // id번째 데이터를 수정한다
    var 품목명 = request.body.name;
    var 품목가 = request.body.price;

    if (items[id]) { // if만 딸랑 있으면 이게 무슨 뜻??
        if (품목명) { items[id].name = 품목명; }
        if (품목가) { items[id].price = 품목가; }

        response.send({
            message: '데이터를 수정했습니다',
            data: items[id]
        });
    }
    else{
        response.send({ error: '존재하지 않는 데이터입니다'});
    }
});

app.del('/products/:id', function(request, response) { // 데이터 삭제(포스트맨으로 실행)
    var num = Number(request.params.id);

    if(isNaN(num)){
        response.send({ error: '숫자를 입력하세요'});
    }
    else if(items[num]){
        items.splice(num, 1); // splice의 정확한 사용법?
        response.send({ message: '데이터를 삭제했습니다'});
    }
    else{
        response.send({ error: '존재하지 않는 데이터입니다'});
    }
});

app.use(function(request, response){ // 사용자 정의 미들웨어(항상 마지막에 실행하기), url 잘못들어간 경우
    response.send('<h1>Hello 미들웨어 .. !</h1>');
});

app.listen(50000, function(){
    console.log('Server Running at http://127.0.0.1:50000');
});
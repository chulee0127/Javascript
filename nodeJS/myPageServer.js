// '작품들'은 부트스트랩에서 참조하기, 웹 채팅도 만들기
// 모듈 추출
var express = require('express'); // express -> 외부 모듈
var bodyParser = require('body-parser'); // body-parser -> 요청 매개변수를 추출하기 위한 미들웨어
var fs = require('fs');

var app = express();
app.use(express.static('myPage')); // static 미들웨어, 매개변수로 폴더이름 -> public 폴더안에 있는 index.html 파일을 기본적으로 실행
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

app.all('/works', function(request, response){ // router 미들웨어 all메서드, 작품 페이지
    response.send('<h1>Works Page</h1>');
});

app.get('/image', function(request, response){
    fs.readFile("image.html", function(error, data){
        if(error){
            console.log(error);
        }
        else{
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        }
    });
});

app.use(function(request, response){ // 사용자 정의 미들웨어(항상 마지막에 실행하기), url 잘못들어간 경우
    response.send('<h1>Hello 미들웨어 .. !</h1>');
});

app.listen(50001, function(){
    console.log('Server Running at http://127.0.0.1:50001');
});
var express = require('express');
var app = express();
var debug = require('debug')('app');
var port = parseInt(process.env.PORT || '3000');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 動作確認用
app.get('/', function(req, res) {
    res.send('hello world');
});

// POST application/x-www-form-urlencoded で受け取るケース
app.post('/param', function(req, res) {
    // console.log("body = ", req.body);
    console.log("_xhr = ", req.body['_xhr']);
    console.log("commodityCD = ", req.body.commodityCD);
    res.send('OK');
});

// テキスト形式のJSONで受け取るケース
app.post('/json', function(req, res) {
    console.log("body = ", req.body);
    json = JSON.parse(req.body.json);
    console.log("name = ", json.name);
    console.log("year = ",  json.year);
    res.send('OK');
});

// イベント待機 
app.listen(port);
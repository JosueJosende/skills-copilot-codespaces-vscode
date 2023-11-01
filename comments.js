// create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// create application/json parser
var jsonParser = bodyParser.json()

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// get comments from file
app.get('/getComments', function (req, res) {
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

// post comments to file
app.post('/postComments', jsonParser, function (req, res) {
    console.log(req.body);
    var obj = req.body;
    var json = JSON.stringify(obj);
    fs.writeFile(__dirname + '/public/comments.json', json, 'utf8', function (err) {
        if (err) throw err;
        console.log('complete');
    });
    res.end(json);
})

// start server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
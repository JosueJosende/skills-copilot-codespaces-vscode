// Create web server
// Run: node comments.js
// Verify: http://localhost:3000

// Load modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Load data from file
var comments = JSON.parse(fs.readFileSync('comments.json'));

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static files
app.use(express.static(__dirname + '/public'));

// Set up routes
app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});

// Start web server
app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
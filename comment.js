// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({
    dest: './data'
});
const moment = require('moment');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'board'
};
const sessionStore = new MySQLStore(options);
const sessionOptions = {
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
};
app.use(session(sessionOptions));

// Router
const main = require('./router/main');
const comment = require('./router/comment');
const login = require('./router/login');
const logout = require('./router/logout');
const register = require('./router/register');
const write = require('./router/write');
const update = require('./router/update');
const del = require('./router/delete');
const profile = require('./router/profile');
const search = require('./router/search');
const searchList = require('./router/searchList');
const searchList2 = require('./router/searchList2');

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/data', express.static('data'));

// View Engine
app.set('view engine', 'ejs');

// DB Setting
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'board'
});
conn.connect();

// Router Mounting
app.use('/', main);
app.use('/comment', comment);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/write', write);
app.use('/update', update);
app.use('/delete', del);
app.use('/profile', profile);
app.use('/search', search);
app.use('/searchList', searchList);
app.use('/searchList2', searchList2);

// Server Setting
app.listen(3000, () => {
    console.log('Server is running port 3000!');
});
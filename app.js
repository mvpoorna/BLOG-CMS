var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose');
var passport = require('passport');

var auth = require('./routes/auth');
var category = require('./routes/category');
var post = require('./routes/post');

var app = express();

app.use(cors({origin: '*'}));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/blog-cms', {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));

app.use('/api/auth', auth);
app.use('/api/category', category);
app.use('/api/post', post);
app.use('/api/public', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

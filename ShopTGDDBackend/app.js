var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var sanpham = require('./routes/sanpham');
var loaisanpham = require('./routes/loaisanpham');
var user = require('./routes/user');
var donhang = require('./routes/donhang');
var ctdonhang = require('./routes/ctdonhang');
var login = require('./routes/login');
var comment = require('./routes/comment');
var search = require('./routes/search');
var giohang = require('./routes/giohang');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', sanpham);
app.use('/api', loaisanpham);
app.use('/api', user);
app.use('/api', donhang);
app.use('/api', ctdonhang);
app.use('/api', login);
app.use('/api', comment);
app.use('/api', search);
app.use('/api', giohang);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var articlesRouter = require('./routes/articles');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var contnetRouter = require('./routes/content');
var headerRouter = require('./routes/header');
var order_set_zRouter = require('./routes/order_set_z');
var shopping_cartRouter = require('./routes/shopping_cart');
var game_classifyRouter = require('./routes/game_classify');
var classify_leftRouter = require('./routes/classify_left');
var classify_rightRouter = require('./routes/classify_right');
var bannerList = require('./routes/login');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/users', usersRouter);
// app.use('/users', articlesRouter);
app.use('/login', loginRouter);
app.use('/content',contnetRouter);
app.use('/header',headerRouter);
app.use('/order_set_z',order_set_zRouter);
app.use('/shopping_cart',shopping_cartRouter);
app.use('/game_classify',game_classifyRouter);
app.use('/classify_left',classify_leftRouter);
app.use('/classify_right',classify_rightRouter);
//bannerlist
app.use('/bannerlist',bannerList);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

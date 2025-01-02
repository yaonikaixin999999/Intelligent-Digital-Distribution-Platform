// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var walletRouter = require('./routes/wallet');
var update_dataRouter = require('./routes/update_data');
var personal_dataRouter = require('./routes/personal_data');
var shopping_cartRouter = require('./routes/shopping_cart');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var contnetRouter = require('./routes/content');
var headerRouter = require('./routes/header');
var order_set_zRouter = require('./routes/order_set_z');
var search_gameRouter = require('./routes/search_game');
// var game_classifyRouter = require('./routes/game_classify');
// var classify_leftRouter = require('./routes/classify_left');
// var classify_rightRouter = require('./routes/classify_right');
var searchRouter = require('./routes/search');
var user_orderRouter = require('./routes/user_order');
var all_gameRouter = require('./routes/all_game');
var game_detailRouter = require('./routes/game_detail');

//管理员端
// var content_sRouter = require('./routes/content_s');
var header_sRouter = require('./routes/header_s');
var all_game_sRouter = require('./routes/all_game_s');
// var game_detail_sRouter = require('./routes/game_detail_s');
var order_process_sRouter = require('./routes/order_process_s');
var personal_data_sRouter = require('./routes/personal_data_s');
var update_data_sRouter = require('./routes/update_data_s');
var user_manage_sRouter = require('./routes/user_manage_s');
var game_shelf_sRouter = require('./routes/game_shelf_s');
var count_volumn_sRouter = require('./routes/count_volumn_s');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/content', contnetRouter);
app.use('/header', headerRouter);
app.use('/order_set_z', order_set_zRouter);
app.use('/shopping_cart', shopping_cartRouter);
// app.use('/game_classify', game_classifyRouter);
// app.use('/classify_left', classify_leftRouter);
// app.use('/classify_right', classify_rightRouter);
app.use('/search', searchRouter);
app.use('/wallet', walletRouter);
app.use('/update_data', update_dataRouter);
app.use('/personal_data', personal_dataRouter);
app.use('/search_game', search_gameRouter);
app.use('/user_order', user_orderRouter);
app.use('/all_game', all_gameRouter);
app.use('/game_detail', game_detailRouter);

//管理员端
// app.use('/content_s',content_sRouter);
app.use('/header_s', header_sRouter);
app.use('/all_game_s', all_game_sRouter);
// app.use('/game_detail_s',game_detail_sRouter);
app.use('/order_process_s', order_process_sRouter);
app.use('/personal_data_s', personal_data_sRouter);
app.use('/update_data_s', update_data_sRouter);
app.use('/user_manage_s', user_manage_sRouter);
app.use('/game_shelf_s', game_shelf_sRouter);
app.use('/count_volumn_s', count_volumn_sRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
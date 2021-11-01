//Requires
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
const session = require('express-session');

let localsCheck = require('./middlewares/localsCheck');
let cookieCheck = require('./middlewares/cookieCheck')

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

//ejecucion de express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configuraciones
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public'))); // recursos estaticos
app.use(methodOverride('_method'))
app.use(session({
  secret: "palabra-secreta",
  resave: true,
  saveUninitialized: false
}));

//middlewares
app.use(localsCheck);
app.use(cookieCheck);

//rutas
app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/usuario', usersRouter);
app.use('/admin', adminRouter);


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

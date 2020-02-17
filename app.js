var createError = require('http-errors');

var express = require('express');
var path = require('path');
 var cookieParser = require('cookie-parser');
 var logger = require('morgan');

const  index = require('./routes/index');
const books = require('./routes/books');

const app = express();
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});

// async IIFE
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting  ', error);
  
    }
})();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', books);



app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'library' ? err : {};

  res.status(err.status || 500);
  if (err.status === 404) {
      res.render('page-not-found');
  } else {
      res.render('error');
  }
});


module.exports = app;
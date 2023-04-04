const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const indexRouter = require('./routes/index');
const minersRouter = require('./routes/miners')
const planetRouter = require('./routes/planet')
const asteroidRouter = require('./routes/asteroid')
const cors = require('cors');

const app = express();
const wsClients = {}
app.wsClients = wsClients;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/miners', minersRouter)
app.use('/planets', planetRouter)
app.use('/asteroids', asteroidRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;

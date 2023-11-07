var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var app = express();

var courseRouter = require('./modules/course/routes/course.routes');
var studentRouter = require('./modules/student/routes/student.routes');
var gradeRouter = require('./modules/grade/routes/grade.routes');
var assignmentRouter = require('./modules/assignment/routes/assignment.routes');
var instructorRouter = require('./modules/instructor/routes/instructor.routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// need to add routes here
app.use('/api/course', courseRouter);
app.use('/api/student', studentRouter);
app.use('/api/grade', gradeRouter);
app.use('/api/instructor', instructorRouter);
app.use('/api/assignment', assignmentRouter);

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

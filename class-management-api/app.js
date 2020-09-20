const express = require('express');
const logger = require('morgan');
const app = express();

const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/lessons', lessonRoutes);

module.exports = app;

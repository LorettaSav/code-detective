const express = require('express');
//const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const snippetsRouter = require('./routes/snippets');
const cors = require('cors');  
 
const app = express();
app.use(cors());  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//app.use('/api', indexRouter);
//app.use('/api/users', usersRouter);
app.use('/api/snippets', snippetsRouter);

module.exports = app;

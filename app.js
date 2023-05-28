const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//const vm = require("node:vm");


//const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');
const snippetsRouter = require('./routes/snippets');
// const mySnippetsRouter = require("./routes/mysnippets")
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
// app.use('/api/snippets', mySnippetsRouter);

module.exports = app;

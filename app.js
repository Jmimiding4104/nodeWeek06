var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
const bodyParser = require('body-parser');

var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');

var app = express();

const connections = require('./connections');
const http = require('./controllers/http');
const errorMessage = require('./service/errorMessage');

//connections();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

connections();

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
app.use('/upload', uploadRouter);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

// 404
app.use(async function (req, res, next) {
  http.notFound(req, res);
});


// dev
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV == 'product' && err.isOperational) {
    res.status(500).json({
      'message': errorMessage(err) // err.message ? err.message : 
    })
  } else if(process.env.NODE_ENV == 'product' && !err.isOperational){
    res.status(500).json({
      'message': '請聯絡管理員!!' // err.message ? err.message : 
    })
  }else {
    res.status(500).json({
      'message': errorMessage(err) // err.message ? err.message : 
    })
  }
})

//捕捉程式錯誤
process.on('uncaughtException', error => {
  console.error('uncaughtException');
  console.error(error.errMessage);
  process.exit(1);
})

//捕捉未處理的 catch
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉的 rehection:', promise, '原因:', reason);
})

module.exports = app;
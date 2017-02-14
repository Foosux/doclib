var express = require('express')
var app = express()
var path = require('path')
require('./db/db')

// 路由文件
var index = require('./routes/index')
var list = require('./routes/list')
// 路由系统
app.use('/', index)
app.use('/list', list)

// 设置静态文件路径、静态资源托管、模板引擎
app.set('views', path.join(__dirname, 'views/pages'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine','jade')

// 路由
var index = require('./routes/index')
var list = require('./routes/list')
app.use('/', index)
app.use('/list', list)

// 404页
app.use(function(req, res, next) {
  var err = new Error('Not Found!!!')
  err.status = 404
  next(err)
})
// 全局error
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

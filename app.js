var express = require('express')
var app = express()
var path = require('path')
var logger = require('morgan')
require('./db/db')

// 设置静态文件路径、模板引擎、CSS引擎、静态资源托管、请求log输出
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine','jade')
app.use(logger('dev'))
app.use(require('stylus').middleware({
  src: path.join(__dirname, 'public/stylesheets'),
  dest: path.join(__dirname, 'public/css')
}))
app.use(express.static(path.join(__dirname, 'public')))


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

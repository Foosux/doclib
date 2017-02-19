var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var logger = require('morgan')
require('./db/db')

app.locals.marked = require('marked')
// app.locals.marked.setOptions({
//   highlight: function (code) {
//     return hljs.highlightAuto(code).value;
//   }
// })
app.locals.test = 1

// 设置静态文件路径、模板引擎、CSS引擎、静态资源托管、请求log输出
app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine','jade')
app.use(logger('dev'))      // 日志打印到控制台
app.use(require('stylus').middleware({
  src: path.join(__dirname, 'public/stylesheets'),
  dest: path.join(__dirname, 'public/css')
}))
app.use(express.static(path.join(__dirname, 'public')))


// var accessLog = fs.createWriteStream('../access.log', {flags : 'a'})
// var errorLog = fs.createWriteStream('../error.log', {flags : 'a'})
// app.use(logger('combined', {stream : accessLog}));      //打印到log日志

// 路由
var index = require('./routes/index')
var page404 = require('./routes/404')
var markdown = require('./routes/markdown')
var list = require('./routes/list')
app.use('/', index)
app.use('/404', page404)
app.use('/md', markdown)
app.use('/list', list)

// 404页
// app.use(function(req, res, next) {
//   res.redirect('/404')
// })

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

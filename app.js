var express = require('express')
var app = express()
var path = require('path')
var fs = require('fs')
var logger = require('morgan')
var bodyParser= require('body-parser')
var connectDB = require('./lib/connectDB')
app.locals.moment = require('moment')
app.locals.marked = require('marked')

// 连接数据库
connectDB('mongodb://127.0.0.1:12345/doclib')
// 设置静态文件路径、模板引擎、CSS引擎、静态资源托管、请求log输出
app.set('views', path.join(__dirname, 'server/views/pages'))
app.set('view engine','jade')
app.use(logger('dev'))        // 日志打印到控制台
app.use(require('stylus').middleware({
  src: path.join(__dirname, 'src/stylesheets'),
  dest: path.join(__dirname, 'src/css')
}))
app.use(express.static(path.join(__dirname, 'dest')))
app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.urlencoded())

// 全局变量
global._GLOBAL_DATA = {
  role: '聪明的小核桃',
  avatar: '/img/avatar/68b15fffe24e67c07c989e3fe27b889a'
}

var readFiles = require('./lib/files')
/**
 * [filesInfo description]
 * @type {path [string]} 读取哪个路径下的文件
 * @type {path [string]} 生成的侧边栏信息保存在哪
 * @type {name [string]} 保存的文件名
 */
var filesInfo = readFiles(
  path.join(__dirname, 'docs'),
  path.join(__dirname, 'server/views/filesroot'),
  'nodejs'
)
// 读取文件返回值
// console.log(filesInfo)


// 路由
var index = require('./server/routes/index')
var page404 = require('./server/routes/404')
var markdown = require('./server/routes/markdown')
// var list = require('./server/routes/list')
var admin = require('./server/routes/admin')
app.use('/', index)
app.use('/404', page404)
app.use('/md', markdown)
// app.use('/list', list)
app.use('/admin', admin)

// 404页
app.use(function(req, res, next) {
  res.redirect('/404')
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

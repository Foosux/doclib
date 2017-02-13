var express = require('express')
var app = express()
var path = require('path')
var db = require('./conf/db')

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

module.exports = app

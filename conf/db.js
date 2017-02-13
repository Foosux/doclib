var mongoose = require('mongoose')
var Doc = require('../models/doc')

// 链接数据库
mongoose.connect('mongodb://127.0.0.1:12345/doclib')
// 打印数据库连接信息
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open',function(cb){
  console.log('moogodb is connection!')
})
mongoose.set('debug', true)

var docA = new Doc({
  title: '第一个文档',
  author: 'Foosux'
})

docA.save(function(err,docA){
  if (err) return console.error(err)
  docA.speak()
})


module.export = db

var mongoose = require('mongoose')

function connectDB (dbURL) {
  // 链接数据库
  mongoose.connect(dbURL)
  // 打印数据库连接信息
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function (cb) {
    console.log('moogodb is connection!')
  })
  // 开启mongoose的 debug 模式
  mongoose.set('debug', true)
}

module.exports = connectDB

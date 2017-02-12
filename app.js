var express = require('express')
var app = express()
var path = require('path')
// 路由文件
var index = require('./routes/index')
var list = require('./routes/list')

app.set('views','./views/pages')
// app.set('views', path.join(__dirname, 'views/pages'))
app.set('view engine','jade')
app.set('port', process.env.PORT || 3000)


// 路由系统
app.use('/', index)
app.use('/list', list)




app.listen(app.get('port'),"127.0.0.1",function(){
  console.log('Docment Library start on port %d',app.get('port'))
})

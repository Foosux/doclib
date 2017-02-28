/**
 * 发布文章时进行md储存
 */
var fs = require('fs')

var fileManage = {
  creatFile: function (filePath, data) {
    fs.exists(filePath, function (exists) {
      if (!exists) {
        fs.writeFile(filePath, data, 'utf-8', function (err) {
          if (err) console.log(err)
          console.log('创建文档成功!')
        })
      } else {
        console.log('该文档已存在')
      }
    })
  }
}

module.exports = fileManage

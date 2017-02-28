/**
 * 目录管理 增加 & 删除
 */
var fs = require('fs')
var exec = require('child_process').exec

var dirManage = {
  mkdir: function (pathName) {
    fs.exists(pathName, function (exists) {
      if (!exists) {
        exec('mkdir -p ' + pathName, function (err) {
          if (err) console.log(err)
          else console.log(pathName + ' 创建成功!')
        })
      } else {
        console.log(pathName + ' 文件目录已存在!')
      }
    })
  },
  rmdir: function (pathName) {
    fs.exists(pathName, function (exists) {
      if (exists) {
        exec('rm -rf ' + pathName, function (err) {
          if (err) console.log(err)
          else console.log(pathName + ' 删除成功!')
        })
      } else {
        console.log(pathName + ' 该目录不存在!')
      }
    })
  }
}

module.exports = dirManage

/**
 * 目录管理 增加 & 删除
 */
var fs = require('fs')
var exec = require('child_process').exec

var dirManage = {
  mkdir: function (path) {
    fs.exists(path, function (exists) {
      if (!exists) {
        exec('mkdir -p ' + path, function (err) {
          if (err) console.log(err)
          else console.log(path + ' 创建成功!')
        })
      } else {
        console.log(path + ' 文件目录已存在!')
      }
    })
  },
  rmdir: function (path) {
    fs.exists(path, function (exists) {
      if (exists) {
        exec('rm -rf ' + path, function (err) {
          if (err) console.log(err)
          else console.log(path + ' 删除成功!')
        })
      } else {
        console.log(path + ' 该目录不存在!')
      }
    })
  }
}

module.exports = dirManage

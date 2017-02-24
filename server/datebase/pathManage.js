var PathModel = require('./models/path')

var PathManage = {
  creat: function (data, callback) {
    var _user = new PathModel({
      pathName: data.pathName,
      level: data.level,
      parentId: data.parentId,
      parentName: data.parentName
    })

    _user.save(function(err, _user) {
      if (err) return console.log(err)
      callback(true)
    })
  },
  fetch: function (callback) {
    PathModel.fetch(function(err,data) {
      if (err) return console.log(err)
      callback(data)
    })
  },
  remove: function (id, callback) {
    PathModel.remove({_id: id}, function(err, data) {
      if (err) return console.log(err)
      callback({
        code: 1,
        msg: '删除成功'
      })
    })
  }
}

module.exports = PathManage

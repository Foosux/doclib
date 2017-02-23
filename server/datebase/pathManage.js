var PathModel = require('./models/path')

var PathManage = {
  creat: function (data, callback) {
    var _user = new UserModel({
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
}

module.exports = PathManage

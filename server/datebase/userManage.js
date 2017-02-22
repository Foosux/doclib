var UserModel = require('./models/user')

var userManage = {
  creat: function (data, callback) {
    var _user = new UserModel({
      userName: data.userName,
      password: data.password,
      avatar: data.avatar,
      role: data.role
    })

    _user.save(function(err, _user) {
      if (err) return console.log(err)
      callback(true)
    })
  },
  fetch: function (callback) {
    UserModel.fetch(function(err,data) {
      if (err) return console.log(err)
      callback(data)
    })
  },
  remove: function (id, callback) {
    UserModel.remove({_id: id}, function(err, data) {
      if (err) return console.log(err)
      callback({
        code: 1,
        msg: '删除成功'
      })
    })
  }
}


module.exports = userManage

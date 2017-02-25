var PathModel = require('./models/path')

var PathManage = {
  creat: function (data, callback) {
    var _user = new PathModel({
      pathName: data.pathName || 'root',
      level: data.level || 0,
      parentId: data.parentId || 0,
      parentName: data.parentName || '/'
    })

    _user.save(function(err, _user) {
      if (err) return console.log(err)
      callback(true)
    })
  },
  fetch: function (callback) {
    PathModel.fetch(function(err,data) {
      if (err) console.log(err)
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
  },
  format: function(data) {
    var res = {
      maxDeep : 0
    }
    data.forEach(function(item,i){
      if (!res['lv'+item.level]) {
        res['lv'+item.level]=[]
        res.maxDeep++
      }
      res['lv'+item.level].push(data[i])
    })
    console.log(res)
    return res
  }
}

module.exports = PathManage

var DocsModel = require('./models/docs')

var DocsManage = {
  creat: function (data, callback) {
    var _doc = new DocsModel({
      title: data.title,
      description: data.description,
      paths: data.paths,
      tags: data.tags,
      article: data.article,
      meta: {
        author: data.author,
        avatar: data.avatar
      }
    })

    _doc.save(function(err, doc) {
      if (err) {
        console.log(err)
        callback({
          code: 0,
          msg: '创建失败'
        })
      }
      callback({
        code: 1,
        msg: '创建成功'
      })
    })
  },
  fetch: function (callback) {
    DocsManage.fetch(function(err, data) {
      if (err) console.log(err)
      callback(data)
    })
  },
  // fetchById: function (id, callback) {
  //   PathModel.fetchById(id, function(err, data) {
  //     if (err) console.log(err)
  //     callback({
  //       code: 1,
  //       data: data || [],
  //       msg: '查询成功'
  //     })
  //   })
  // },
  // remove: function (id, callback) {
  //   PathModel.remove({
  //     $or: [
  //       {_id: id},
  //       {parentId: id},
  //       {grandId: id}
  //     ]
  //   }, function(err, data) {
  //     if (err) return console.log(err)
  //     callback({
  //       code: 1,
  //       msg: '删除成功'
  //     })
  //   })
  // },
  //
}

module.exports = DocsManage

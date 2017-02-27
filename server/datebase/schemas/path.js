/**
 * 分类/路径表
 */
var mongoose = require('mongoose')

var PathSchemas = new mongoose.Schema({
  pathName: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  parentId: String,
  parentName: String,
  grandId: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
PathSchemas.pre('save',function(next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }else{
    this.updateAt = Date.now()
  }
  next() // 保持流程
})

PathSchemas.statics = {
  fetch: function (cb) {
    return this
      .find()
      .sort({'meta.updateAt':-1})
      .exec(cb)
  }
}

module.exports = PathSchemas

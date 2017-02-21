/**
 * 用户表
 */
var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  },
  time: {
    type: Date,
    default: Date.now()
  }
})

UserSchema.pre('save',function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }else{
    this.meta.updateAt = Date.now()
  }
  next() // 保持流程
})

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find()
      .sort({time:-1})
      .exec(cb)
  }
}

module.exports = UserSchema

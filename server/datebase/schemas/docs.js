/**
 * doc Schema
 */
var mongoose = require('mongoose')

var DocsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  paths: [],
  tags: [],
  article: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now
    },
    updateAt: {
      type: Date,
      default: Date.now
    },
    author: {
      type: String,
      required: true
    },
    avatar: String
  }
})

// model方法
DocsSchema.statics = {
  fetch: function (cb) {
    return this
      .find()
      .exec(cb)
  }
}





// DocSchema.virtual('name.full').get(function () {
//   return this.name.first + this.name.last
// })
// DocSchema.virtual('name.full').set(function (name) {
//   var split = name.split(' ');
//   this.name.first = split[0];
//   this.name.last = split[1];
// })
// DocSchema.path('author').get(function (v) {
//   return v + 'is MyName!@!'
// })
DocsSchema.post('init', function (doc) {
  console.log('%s has been initialized from the db', doc._id);
})
DocsSchema.post('validate', function (doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
})
DocsSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
DocsSchema.post('remove', function (doc) {
  console.log('%s has been removed', doc._id);
})


module.exports = DocsSchema

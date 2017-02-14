/**
 * doc Schema
 */
var mongoose = require('mongoose')

var DocSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  friends: [Number],
  // name: {
  //   first: String,
  //   last: String
  // },
  author: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now
    },
    // updateAt: {
    //   type: Date,
    //   default: Date.now
    // }
  }
})

// DocSchema.methods.speak = function () {
//   var greeting = this.author
//     ? "speak author is: " + this.author
//     : "i do not have a author"
//   console.log(greeting)
// }


// DocSchema.statics.findDoc = function (cb) {
//   this.find({},cb)
// }
//
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


DocSchema.post('init', function (doc) {
  console.log('%s has been initialized from the db', doc._id);
})
DocSchema.post('validate', function (doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
})
DocSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
DocSchema.post('remove', function (doc) {
  console.log('%s has been removed', doc._id);
})


module.exports = DocSchema

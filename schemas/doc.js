/**
 * doc Schema
 */
var mongoose = require('mongoose')

var DocSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
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

DocSchema.methods.speak = function () {
  var greeting = this.author
    ? "speak author is: " + this.author
    : "i do not have a author"
  console.log(greeting)
}


module.exports = DocSchema

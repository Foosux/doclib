/**
 * doc Model
 */
var mongoose = require('mongoose')
var DocSchema = require('../schemas/doc')
var Doc = mongoose.model('Doc', DocSchema)

// Doc.find({title: 'model'}).where('createdDate').exec(function(err,doc){
//   if (err) return console.error(err)
//   console.log(doc)
// })

// Doc.update({title: 'test2'},{$set: {title: 'test'}},function(err,doc){
  // if (err) return console.error(err)
  // console.log(doc)
// })

module.exports = Doc

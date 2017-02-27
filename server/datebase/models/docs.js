/**
 * doc Model
 */
var mongoose = require('mongoose')
var DocsSchema = require('../schemas/docs')
var Docs = mongoose.model('Doc', DocsSchema)


module.exports = Docs

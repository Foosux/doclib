/**
 * doc Model
 */
var mongoose = require('mongoose')
var DocSchema = require('../schemas/doc')

var Doc = mongoose.model('doces', DocSchema)

module.exports = Doc

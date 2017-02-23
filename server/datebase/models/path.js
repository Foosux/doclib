/**
 * 分类/路径 Model
 */
var mongoose = require('mongoose')
var PathSchemas = require('../schemas/path')
var PathModel = mongoose.model('paths', PathSchemas)

module.exports = PathModel

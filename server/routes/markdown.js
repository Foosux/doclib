var express = require('express')
var router = express.Router()
var path = require('path')
var fs = require('fs')

router.route('/:name')
  .get(function(req, res) {
    var fileName = req.params.name + '.md'
    var fileQuery = req.query.path || '.' || ''
    // console.log(path.join(__dirname,'..','docs',fileQuery,fileName))
    fs.readFile(path.join(path.resolve(),'docs',fileQuery,fileName), 'utf8', function(err, str) {
      if (err) return console.error(err)
      fn(null, res, str)
    })
    function fn (err, res, str) {
      res.render('markdown',{
        htmlStr: str
      })
    }
  })

module.exports = router

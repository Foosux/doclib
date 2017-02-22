var express = require('express')
var router = express.Router()

router.route('/')
  .get(function(req, res, next) {
    res.render('list', {
      title: '列表页'
    })
  })

router.route('/:id')
  .get(function(req, res, next) {
    res.send(req.params.id)
  })

module.exports = router

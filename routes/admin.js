var express = require('express')
var router = express.Router()

router.route('/')
  .get(function(req, res, next) {
    res.render('adminHome',{
    })
  })

router.route('/home')
  .get(function(req, res, next) {
    res.render('adminHome',{
    })
  })

router.route('/new')
  .get(function(req, res, next) {
    res.render('adminNew',{
    })
  })

router.route('/user')
  .get(function(req, res, next) {
    res.render('adminUserManage',{
    })
  })

// router.route('/')


module.exports = router

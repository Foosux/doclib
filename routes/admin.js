var express = require('express')
var router = express.Router()

router.route('/')
  .get(function(req, res, next) {
    res.render('404',{

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

router.route('/addUser')
  .get(function(req, res, next) {
    res.render('adminAddUser',{

    })
  })

// router.route('/')


module.exports = router
